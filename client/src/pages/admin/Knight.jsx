import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../component/features/Loader";
import Header from "../../component/features/Header";
import { X } from "lucide-react";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="container fixed max-w-2xl  inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full  bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{"اضافة متسابق"}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
const Knight = () => {
  const [notify, setNotify] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [knight, setKnight] = useState("");
  const [horse, setHorse] = useState("");
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/player");
        setPlayers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/player", { knight, horse });
      console.log(res);
      setLoading(false);
      setKnight("");
      setHorse("");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/player/${id}`);
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      {error != null ? (
        <div>
          <span className="invisible">{notify}</span>
        </div>
      ) : null}
      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-3 w-52 text-lg bg-[var(--primary-color)] text-white  rounded hover:bg-blue-600 transition-all">
              اضافة متسابق
            </button>

            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="بيانات المتسابق">
              <div className=" relative grid grid-cols-1 gap-2 max-md:grid-cols-1 border-2 border-[var(--dark-color)] mb-2">
                <div className="col-span-2 grid grid-cols-1 gap-2 max-lg:grid-cols-1 max-sm:grid-cols-1 mt-4 p-2 rounded-md">
                  <div className="items-center">
                    <label className="text-[18px] text-[var(--dark-color)] font-bold">
                      اسم اللاعب
                    </label>
                    <input
                      value={knight}
                      onChange={(e) => setKnight(e.target.value)}
                      type="text"
                      placeholder="اسم الاعب"
                      className="p-2 bg-[var(--white-color)] text-black w-full text-lg border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
                    />
                  </div>

                  <div className="items-center">
                    <label className="text-[18px] text-[var(--dark-color)] font-bold">
                      اسم الخيل
                    </label>
                    <input
                      value={horse}
                      onChange={(e) => setHorse(e.target.value)}
                      type="text"
                      placeholder="اسم الخيل"
                      className="p-2 bg-[var(--white-color)] text-black w-full text-lg border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="mx-auto mb-4 px-6 py-2.5  text-lg bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all">
                  حفظ
                </button>
              </div>
            </Modal>
          </>
        )}
        <div className="w-full  bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-xl p-8 mt-4">
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-[var(--primary-color)] to-blue-700">
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    مسلسل
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    اسم اللاعب
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    اسم الخيل
                  </th>

                  <th className="px-6 py-4 text-right text-white font-semibold">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {players?.data?.length != 0 &&
                  players?.data?.map((comp, index) => (
                    <tr key={index} className="text-lg text-black">
                      <td className="p-2 text-right">
                        <span className="text-gray-700">{index + 1}</span>
                      </td>
                      <td className="p-2 text-right">
                        <span className="text-gray-700">{comp?.knight}</span>
                      </td>
                      <td className="p-2 text-right">
                        <span className="font-medium text-gray-800">
                          {comp?.horse}
                        </span>
                      </td>

                      <td className="p-2 text-right">
                        <button
                          className="font-bold bg-red-500 text-blue-100 p-3 rounded-full text-sm"
                          onClick={() => handleDelete(comp?._id)}>
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knight;
