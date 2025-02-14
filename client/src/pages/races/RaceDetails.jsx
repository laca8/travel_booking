import React, { useEffect, useState } from "react";
import Header from "../../component/features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editRace,
  editStageRace,
  fetchRace,
} from "../../redux/slicers/raceSlicer";
import Loader from "../../component/features/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchHorse, fetchHorses } from "../../redux/slicers/horseSlicer";
import { fetchKnight, fetchKnights } from "../../redux/slicers/knightSlicer";
import axios from "axios";
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-2 rounded ">
      <span className="text-xs  text-[var(--primary-color)] block font-bold w-full">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800 ">{value}</span>
    </div>
  );
}
const Race = () => {
  const { id } = useParams();
  const [notify, setNotify] = useState("");
  const [players, setPlayers] = useState([]);
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
  const [entry, setEntry] = useState([]);
  const [num, setNum] = useState(0);

  const handleSubmit = () => {
    const row = { id: id, knight: riderName, horse: horseName, num: num };
    dispatch(editRace(row));
    if (success) {
      setRiderName("");
      setHorseName("");
      setNum(0);
    }
    // إعادة تعيين الحقول بعد التسجيل
  };

  const handleRace = () => {
    const arr = Array.from({ length: race?.data?.num_rounds }, (_, j) => ({
      id: j,
      distance: race?.data?.rounds?.map((x, index) => {
        if (index === j) {
          return x.distance;
        }
      })[j],
      riders: Array.from({ length: race?.data?.players?.length }, (_, i) => ({
        id:
          race?.data?.players?.length != 0
            ? race?.data?.players?.map((x, index) => {
                if (index === i) {
                  return x.num;
                }
              })[i]
            : "",

        riderName:
          race?.data?.players?.length != 0
            ? race?.data?.players?.map((x, index) => {
                if (index === i) {
                  return x.knight;
                }
              })[i]
            : "",
        horseName:
          race?.data?.players?.length != 0
            ? race?.data?.players?.map((x, index) => {
                if (index === i) {
                  const res = x.horse;
                  console.log(x.horse);
                  return res;
                }
              })[i]
            : "",

        startTime: j === 0 ? "00:00" : "",
        endTime: "",
        duration: "",
        timeInMinutes: 0,
        speed: 0,
        vetTime: race?.data != null ? race?.data?.vite_time : "",
        lastVetTime: "",
        passVetTime: "",
        recovery: "",
        qualified: "",
        pulse: "",
        restTime: race?.data != null ? race?.data?.rest_time : "",
        totalRiding: "",
        finishTime: "",
      })),
    }));
    const row = { id: id, entries: arr };
    const ent = localStorage.getItem(`raceStages-${id}`);

    localStorage.setItem(
      `raceStages-${id}`,
      JSON.stringify(race?.data?.entries)
    );

    if (race?.data?.entries.length == 0) {
      dispatch(editStageRace(row));
    }
    if (success) {
      navigator(`/race/start/${id}`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/player");
        setPlayers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">تفاصيل المسابقة</h2>

              <button
                disabled={loading}
                onClick={() => handleRace(race?.date?._id)}
                className="text-sm bg-yellow-700 shadow-2xl text-[var(--white-color)] p-2 rounded-md font-bold mb-2 hover:scale-95 transition-all duration-300">
                الي السباق
              </button>
            </div>
            <div className="bg-[--primary-color] rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem label="التاريخ" value={race?.data?.date} />
                <InfoItem label="المكان" value={race?.data?.address} />
                <InfoItem label="المسافة (كم)" value={race?.data?.distance} />
                <InfoItem
                  label="أقل سرعة (كم/س)"
                  value={race?.data?.min_speed}
                />
                <InfoItem
                  label="أقصي سرعة (كم/س)"
                  value={race?.data?.max_speed}
                />
                <InfoItem label="vet time" value={race?.data?.vite_time} />
                <InfoItem label="rest time" value={race?.data?.rest_time} />
                <InfoItem label="عدد المراحل" value={race?.data?.num_rounds} />
                <InfoItem
                  label="عدد المتسابقين"
                  value={race?.data?.players?.length}
                />
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">المراحل:</h3>
          <div className="grid grid-cols-2 gap-2">
            {race?.data?.rounds?.map((stage, index) => (
              <div key={index} className="mb-2">
                <p className="font-bold py-1 px-3 bg-blue-100 rounded-full">
                  <strong>المرحلة {1 + index}</strong>
                </p>
                <p className="py-1 px-3 font-bold">
                  مسافة المرحلة:{" "}
                  <span className="font-bold py-1 px-3  bg-green-100 rounded-full">
                    {stage?.distance} كم
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">تسجيل في المسابقة</h2>
              <h2 className="text-sm  text-yellow-700 border-2 border-yellow-700 p-2 rounded-full font-semibold mb-2">
                {" "}
                يجب عليك اختيار رقم متسابق و فارس و خيل
              </h2>
            </div>
            <div className="mb-2 w-full">
              <label className="w-full block text-sm font-bold text-gray-700 mb-2">
                رقم المتسابق
              </label>
              <input
                type="number"
                id="stageCount"
                min="1"
                max="99"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-bold">اسم الفارس:</label>
              <select
                className="border rounded w-full p-2"
                required
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}>
                <option selected disabled value={""}>
                  اختر
                </option>
                {players?.data &&
                  players?.data?.map((x, i) => (
                    <option value={x.knight} key={i}>
                      {x.knight}
                    </option>
                  ))}
              </select>
              {/* <label className="w-full block text-sm font-bold text-gray-700 mb-2">
                اسم الفارس
              </label>
              <input
                type="text"
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              /> */}
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-bold">اسم الخيل:</label>
              <select
                disabled={players?.data?.length == 0}
                className="border rounded w-full p-2"
                required
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}>
                <option value={""} selected disabled>
                  اختر
                </option>
                {players?.data &&
                  players?.data?.map((x, i) => (
                    <option value={x?.horse} key={i}>
                      {x?.horse}
                    </option>
                  ))}
              </select>
              {/* <label className="w-full block text-sm font-bold text-gray-700 mb-2">
                اسم الخيل
              </label>
              <input
                type="text"
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              /> */}
            </div>
            <button
              onClick={() => handleSubmit()}
              disabled={horseName == "" || riderName == "" || num == 0}
              type="submit"
              className="bg-[var(--primary-color)] text-white rounded p-2">
              سجل الآن
            </button>
            <div className="bg-yellow-200 p-2 mt-2 rounded-md text-lg">
              <p>ملاحظة !</p>
              <p> 1-يجب اضافة كل اللاعبين قبل بداية السباق</p>
              <p>
                2- اذا تم الضغط علي زرار الي السباق وتم الدخول الي المسابقة لن
                يتم اضافة لاعبين اخرين
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="overflow-x-auto rounded-lg shadow-sm max-h-48">
              <table className="w-full border-collapse bg-white  overflow-y-auto">
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
                        <span className="font-bold py-1 px-3 bg-blue-100 rounded-full ">
                          {comp?.num}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-gray-800">
                          {comp?.knight}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-gray-800 text-sm">
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
