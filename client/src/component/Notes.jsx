import React, { useEffect, useState } from "react";
import { Send, User, Clock, CheckCircle, Shield } from "lucide-react";
import Header from "./features/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./features/Loader";
import { fetchNotes, addNote, editNote } from "../redux/slicers/noteSlicer";
import { toast } from "react-toastify";

const InquiriesPage = () => {
  function formatTime(time, prefix = "") {
    return typeof time == "object" ? prefix + time.toLocaleDateString() : "";
  }
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const noteSlice = useSelector((state) => state.noteSlice);
  const { loading, error, notes, note, success } = noteSlice;
  const [isAdmin, setIsAdmin] = useState(true); // تحديد ما إذا كان المستخدم الحالي مشرفاً
  const [ans, setAns] = useState(true);
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);

  const [newQuestion, setNewQuestion] = useState("");
  const [adminResponse, setAdminResponse] = useState("");

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newInquiry = {
      question: newQuestion,
    };
    dispatch(addNote(newInquiry));
    dispatch(fetchNotes());

    if (success) {
      setNotify(toast.success("تم اضافة استفسار جديد"));
    }
    setNewQuestion("");
  };

  const handleAdminResponse = (id) => {
    if (adminResponse == "") return;
    const row = {
      id,
      answer: adminResponse,
    };
    console.log(row);

    dispatch(editNote(row));
    dispatch(fetchNotes());

    setAdminResponse("");
  };
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);
  const handleClose = (i) => {
    notes?.data?.map((x, index) => {
      if (index === i) {
        setAns(!ans);
      } else {
        setAns("");
      }
    });
  };
  const handleChange = (index, value) => {
    notes?.data?.map((x, i) => {
      if (index == i) {
        setAdminResponse(value);
        console.log(adminResponse, i, index);
      }
    });
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-center  mb-6">
          <h3 className="text-[var(--white-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
            المتابعات
          </h3>
        </div>

        <form onSubmit={handleSubmitQuestion} className="mb-8">
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              <Send className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className="flex-1 p-2 border rounded text-right"
              dir="rtl"
            />
          </div>
        </form>

        {/* قائمة الاستفسارات */}
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {notes?.data?.map((inquiry, i) => (
              <div
                key={inquiry.id}
                className="border rounded-lg p-4 bg-white shadow-md text-lg">
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-md ${
                        inquiry?.answer == "" || !inquiry?.answer
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {inquiry?.answer == "" || !inquiry?.answer
                        ? "قيد المعالجة"
                        : "تم الرد"}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {inquiry?.createdAt?.toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{inquiry?.userId?.name}</span>
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="mt-3 text-right">
                  <p className="text-gray-700">{inquiry?.question}</p>
                </div>

                {/* منطقة رد المشرف */}

                <div className="mt-4 pr-6 border-r-2 border-green-500">
                  <>
                    {inquiry?.answer != "" || !inquiry.answer ? null : (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">رد المشرف</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                    <p className="font-bold text-[var(--primary-color)] p-2 rounded-md shadow-md">
                      {inquiry?.answer}
                    </p>
                  </>
                  {user?.data?.isAdmin ? (
                    <div>
                      {inquiry?.answer == "" ||
                        (!inquiry?.answer && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAdminResponse(inquiry._id)}
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                              رد
                            </button>
                            <input
                              type="text"
                              onChange={(e) => handleChange(i, e.target.value)}
                              placeholder="اكتب ردك هنا..."
                              className="flex-1 p-2 border rounded text-right"
                              dir="rtl"
                            />
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InquiriesPage;
