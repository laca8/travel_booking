import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrains } from "../../redux/slicers/trainSlicer";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const Trains = () => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState("");
  const trainSlice = useSelector((state) => state.trainSlice);
  let { trains, loading, error, success } = trainSlice;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigator = useNavigate();

  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    dispatch(fetchTrains(search));
  }, [search]);
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
      {loading && <Loader />}
      <div className="trains font-[sans-serif]   p-10 shadow-lg rounded-md">
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-[var(--white-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
            التدريبات
          </h3>
        </div>
        <div className="items-center">
          <label className="text-[18px] text-[var(--white-color)] font-bold">
            نوع الخطوة
          </label>
          <select
            className="border rounded-lg w-full p-2 mb-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}>
            <option selected disabled value={""}>
              اختر
            </option>
            {trains?.data
              ?.filter((x, i, r) => i === r.findIndex((y) => y.type == x.type))
              ?.map((x, i) => (
                <option key={i}>{x.type}</option>
              ))}
          </select>
        </div>
        <div className="w-full  bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-xl p-8">
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-[var(--primary-color)] to-blue-700">
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    رقم التدريب
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    المسافة (كم)
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    الوقت (بالدقائق)
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    نوع الخطوة
                  </th>
                </tr>
              </thead>
              <tbody>
                {trains?.data &&
                  trains?.data?.map((comp, index) => (
                    <tr
                      key={index}
                      className={`
                border-b border-gray-100
                transition-colors duration-200
                hover:bg-blue-50
                ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              `}>
                      <td className="px-6 py-4 text-right">
                        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                          {comp?.num}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium text-gray-800">
                          {comp?.distance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className=" text-gray-800  text-sm">
                          {comp?.time}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        <span className=" text-gray-800  text-sm">
                          {comp?.type}
                        </span>
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

export default Trains;
