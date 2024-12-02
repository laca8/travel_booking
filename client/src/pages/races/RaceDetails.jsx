import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRace, fetchRace } from "../../redux/slicers/raceSlicer";
import Loader from "../../component/features/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchHorse } from "../../redux/slicers/horseSlicer";
import { fetchKnight } from "../../redux/slicers/knightSlicer";
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-2 rounded">
      <span className="text-xs  text-[var(--primary-color)] block font-bold">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}
const Race = () => {
  const { id } = useParams();
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const raceSlice = useSelector((state) => state.raceSlice);
  const { race, loading, error, success } = raceSlice;
  const navigator = useNavigate();
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  useEffect(() => {
    dispatch(fetchRace(id));
  }, [id]);
  const [riderName, setRiderName] = useState("");
  const [horseName, setHorseName] = useState("");

  const handleSubmit = () => {
    const row = { id: id, knight: riderName, horse: horseName };
    dispatch(editRace(row));

    // إعادة تعيين الحقول بعد التسجيل
    setRiderName("");
    setHorseName("");
  };
  useEffect(() => {
    dispatch(fetchHorse());
  }, []);
  const horseSlice = useSelector((state) => state.horseSlice);
  const { horses } = horseSlice;
  useEffect(() => {
    dispatch(fetchKnight());
  }, []);
  const knightSlice = useSelector((state) => state.knightSlice);
  const { knight } = knightSlice;

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
      <div className="container w-full p-5 grid grid-cols-2  gap-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6  ">
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              تفاصيل المسابقة
            </h3>
            <div className="bg-[--primary-color] rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem label="التاريخ" value={race?.data?.date} />
                <InfoItem label="المكان" value={race?.data?.address} />
                <InfoItem label="المسافة" value={race?.data?.distance} />
                <InfoItem label="أدني سرعة" value={race?.data?.min_speed} />
                <InfoItem label="أقصي سرعة" value={race?.data?.max_speed} />
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">المراحل:</h3>
          <div className="grid grid-cols-2 gap-2">
            {race?.data?.rounds?.map((stage, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium py-1 px-3 bg-blue-100 rounded-full">
                  <strong>المرحلة {1 + index}</strong>
                </p>
                <p className="py-1 px-3">
                  بداية المرحلة:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.start}
                  </span>
                </p>
                <p className="py-1 px-3">
                  نهاية المرحلة:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.end}
                  </span>
                </p>
                <p className="py-1 px-3">
                  {" "}
                  سرعة المرحلة:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.speed}
                  </span>
                </p>
                <p className="py-1 px-3">
                  زمن المرحلة:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.time}
                  </span>
                </p>
                <p className="py-1 px-3">
                  ميعاد الكشف:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.state_time}
                  </span>
                </p>
                <p className="py-1 px-3">
                  اخر ميعاد للكشف:{" "}
                  <span className="font-medium py-1 px-3  bg-green-100 rounded-full">
                    {stage?.last_state}
                  </span>
                </p>
                {/* <InfoItem label="بداية المرحلة" value={stage?.start} />
                <InfoItem label="نهاية المرحلة" value={stage?.end} />
                <InfoItem label="سرعة المرحلة:" value={stage?.speed} />
                <InfoItem label="زمن المرحلة:" value={stage?.time} />
                <InfoItem label="ميعاد الكشف:" value={stage?.state_time} />
                <InfoItem label="اخر ميعاد للكشف:" value={stage?.last_state} /> */}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">تسجيل في المسابقة</h2>
              <h2 className="text-sm  text-[var(--primary-color)] border-2 p-2 rounded-full font-semibold mb-2">
                {" "}
                يجب عليك اضافة فارس واضافة خيل
              </h2>
            </div>

            <div className="mb-4">
              <label className="block mb-1">اسم الفارس:</label>
              <select
                disabled={!knight || !knight?.data}
                className="border rounded w-full p-2"
                required
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}>
                <option selected disabled value={""}>
                  اختر
                </option>
                <option value={knight?.data && knight?.data?.name}>
                  {knight?.data && knight?.data?.name}
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">اسم الحصان:</label>
              <select
                disabled={horses?.data?.length == 0}
                className="border rounded w-full p-2"
                required
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}>
                <option value={""} selected disabled>
                  اختر
                </option>
                {horses?.data &&
                  horses?.data?.map((x, i) => (
                    <option value={x?.name} key={i}>
                      {x?.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={() => handleSubmit()}
              disabled={!horseName || !riderName}
              type="submit"
              className="bg-[var(--primary-color)] text-white rounded p-2">
              سجل الآن
            </button>
          </div>
          <div className="mt-2">
            <div className="overflow-x-auto rounded-lg shadow-sm">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-[var(--primary-color)] to-blue-700">
                    <th className="px-6 py-4 text-right text-white font-semibold">
                      الرقم
                    </th>
                    <th className="px-6 py-4 text-right text-white font-semibold">
                      الفارس
                    </th>
                    <th className="px-6 py-4 text-right text-white font-semibold">
                      الخيل
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {race?.data?.players?.map((comp, index) => (
                    <tr
                      key={index}
                      className={`
                  border-b border-gray-100
                  transition-colors duration-200
                  hover:bg-blue-50
                  ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                `}>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium py-1 px-3 bg-blue-100 rounded-full ">
                          {1 + index}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium text-gray-800">
                          {comp?.knight}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium text-gray-800 text-sm">
                          {comp?.horse}
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
    </div>
  );
};

export default Race;
