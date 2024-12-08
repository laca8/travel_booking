import React, { useEffect, useState } from "react";
import Header from "../../component/features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRace,
  fetchRaces,
  removeRace,
} from "../../redux/slicers/raceSlicer";
import Loader from "../../component/features/Loader";
import { toast } from "react-toastify";

const Races = () => {
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const raceSlice = useSelector((state) => state.raceSlice);
  const { races, loading, error, success } = raceSlice;
  const navigator = useNavigate();
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  useEffect(() => {
    dispatch(fetchRaces());
  }, []);
  const handleDelete = (id) => {
    dispatch(removeRace(id));
    dispatch(fetchRaces());
  };
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
      <div className="container font-[sans-serif]   p-10 shadow-lg rounded-md text-lg">
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-[var(--white-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
            المسابقات
          </h3>
        </div>
        <div className="w-full  bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-xl p-8">
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-[var(--primary-color)] to-blue-700">
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    التاريخ
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    المكان
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    المسافة (كم)
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    أدنى سرعة (كم/س)
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    أقصى سرعة (كم/س)
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    عدد المراحل
                  </th>

                  <th className="px-6 py-4 text-right text-white font-semibold">
                    التسجيل في المسابقة
                  </th>
                  <th className="px-6 py-4 text-right text-white font-semibold">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {races?.data?.length != 0 &&
                  races?.data?.map((comp, index) => (
                    <tr
                      key={index}
                      className={`
                  border-b border-gray-100
                  transition-colors duration-200
                  hover:bg-blue-50
                  ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                `}>
                      <td className="px-6 py-4 text-right">
                        <span className="text-gray-700">
                          {new Date(comp?.date).toLocaleDateString("ar-EG")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium text-gray-800">
                          {comp?.address}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                          {comp?.distance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {comp?.min_speed}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {comp?.max_speed}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm">
                          {comp?.num_rounds}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-bold bg-[var(--dark-color)] text-blue-100 p-3 rounded-full text-sm"
                          onClick={() =>
                            navigator(`/race-details/${comp?._id}`)
                          }>
                          التسجيل
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
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

export default Races;
