import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { addTrain } from "../../redux/slicers/trainSlicer";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
const Training = () => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [num, setNum] = useState(
    Math.floor(Math.random() * 26) +
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 5)
  );

  const trainSlice = useSelector((state) => state.trainSlice);
  const { train, loading, error, success } = trainSlice;
  const navigator = useNavigate();
  const handleSubmit = () => {
    const row = {
      time,
      type,
      num,
      distance,
    };
    console.log(row);

    dispatch(addTrain(row));
    window.location.href = "/add-train";

    if (success) {
      setNotify(toast.success("تم اضافة بيانات التدريب"));
    }
  };
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  return (
    <div className="">
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      {error && (
        <div>
          <span className="invisible">{notify}</span>
        </div>
      )}
      <form className="font-[sans-serif] mt-10 max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-md">
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
            التدريب
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              رقم التدريب
            </label>
            <input
              disabled
              value={num}
              required
              type="text"
              placeholder="رقم التدريب"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              المسافة / كم
            </label>
            <input
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              type="text"
              placeholder="المسافة"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              الوقت / بالدقائق
            </label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              type="text"
              placeholder="الوقت"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              نوع الخطوة
            </label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              type="text"
              placeholder="نوع الخطوة"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all"
          onClick={() => handleSubmit()}>
          {loading ? <Loader /> : "حفظ"}
        </button>
      </form>
    </div>
  );
};

export default Training;
