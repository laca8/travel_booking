import React, { useState, useEffect } from "react";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { toast } from "react-toastify";
import Loader from "../features/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRace } from "../../redux/slicers/raceSlicer";

const DynamicHorseRallyAllStages = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRace(id));
  }, [id]);
  const raceSlice = useSelector((state) => state.raceSlice);
  const { race, loading, error, success } = raceSlice;
  const [stageCount, setStageCount] = useState(race?.data?.num_rounds);
  const [entries, setEntries] = useState([]);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    const initialEntries = Array.from(
      { length: race?.data?.players?.length },
      (_, i) => ({
        id:
          race?.data?.players?.length != 0
            ? race?.data?.players?.map((x, index) => {
                if (index === i) {
                  return x.num;
                }
              })
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

        riderName:
          race?.data?.players?.length != 0
            ? race?.data?.players?.map((x, index) => {
                if (index === i) {
                  return x.knight;
                }
              })[i]
            : "",
        stages: Array.from({ length: stageCount }, (_, j) => ({
          startTime: "",
          endTime: "",
          duration: "",
          timeInMinutes: 0,
          speed: "",
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
      })
    );
    setEntries(initialEntries);
  }, [stageCount, id]);

  const calculateDuration = (start, end) => {
    if (!end) return "";
    const startDate = new Date(`1970/01/01 ${start}`);

    const endDate = new Date(`1970/01/01 ${end}`);
    const diff = endDate - startDate;

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateTimeInMinutes = (duration) => {
    if (!duration) return 0;
    console.log(duration);
    const [hours, minutes] = duration.split(":").map(Number);
    // console.log(hours, minutes);

    return hours * 60 + minutes;
  };

  const calculateSpeed = (index, timeInMinutes) => {
    if (timeInMinutes === 0) return "";

    const distance =
      race?.data != null &&
      race?.data?.rounds.map((x, i) => {
        if (index === i) {
          console.log(Number(x.distance)[i]);
          return Number(x?.distance);
        }
      });
    console.log(distance[index], timeInMinutes);

    const speed = distance[index] / (timeInMinutes / 60);
    return speed.toFixed(2);
  };

  //   const addMinutesToTime = (time, minutes) => {
  //     const [hours, mins] = time.split(":").map(Number);
  //     const totalMinutes = hours * 60 + mins + minutes;
  //     const newHours = Math.floor(totalMinutes / 60);
  //     const newMins = totalMinutes % 60;
  //     return `${newHours.toString().padStart(2, "0")}: ${newMins
  //       .toString()
  //       .padStart(2, "0")}`;
  //   };

  const lastVetTimeHandle = (arrive, vetTime) => {
    if (arrive === "") return "";
    const [hours, mins] = arrive.split(":").map(Number);
    const [h, m] = vetTime.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + m;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndTimeChange = (entryId, stageIndex, value) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === entryId) {
          const updatedStages = entry.stages.map((stage, index) => {
            if (index === stageIndex) {
              const duration = calculateDuration(stage.startTime, value);
              console.log(duration);
              const timeInMinutes = calculateTimeInMinutes(duration);
              const lastCheckTime = lastVetTimeHandle(
                value,
                race?.data?.vite_time
              );
              const speed = calculateSpeed(index, timeInMinutes);

              return {
                ...stage,
                endTime: value,
                duration,
                timeInMinutes,
                lastVetTime: lastCheckTime,
                speed,
              };
            }
            return stage;
          });

          return { ...entry, stages: updatedStages };
        }
        return entry;
      })
    );
  };
  const recoverySum = (passVet, duration) => {
    const startDate = new Date(`1970/01/01 ${duration}`);

    const endDate = new Date(`1970/01/01 ${passVet}`);
    const diff = endDate - startDate;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };
  const totalRidingSum = (duration, recovery) => {
    const [h1, m1] = duration.split(":").map(Number);
    const [h2, m2] = recovery.split(":").map(Number);

    const diff = h1 * 60 + h2 * 60 + m1 + m2;
    const hours = Math.floor(diff / 60);
    const minutes = Math.floor(diff % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };
  const finishSum = (rest, passVet) => {
    if (passVet === "") return "";
    const [h1, m1] = rest.split(":").map(Number);
    const [h2, m2] = passVet.split(":").map(Number);
    const diff = h1 * 60 + h2 * 60 + m1 + m2;
    const hours = Math.floor(diff / 60);
    const minutes = Math.floor(diff % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    // return { rest, passVet };
  };
  const recoveryHandle = (entryId, stageIndex, value) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === entryId) {
          const updatedStages = entry.stages.map((stage, index) => {
            if (index === stageIndex) {
              const recovery = recoverySum(value, stage.endTime);
              const totalRiding = totalRidingSum(stage.duration, recovery);
              const finish = finishSum(stage.restTime, value);

              return {
                ...stage,
                passVetTime: value,
                recovery,
                totalRiding,
                finishTime: finish,
              };
            }
            if (index === stageIndex + 1) {
              console.log(stage.finishTime);
              return {
                ...stage,
                startTime: finishSum(stage.restTime, value),
              };
            }
            return stage;
          });

          return { ...entry, stages: updatedStages };
        }
        return entry;
      })
    );
  };

  const handleChange = (entryId, stageIndex, value, field) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === entryId) {
          const updatedStages = entry.stages.map((stage, index) => {
            if (index === stageIndex) {
              return {
                ...stage,
                [field]: value,
              };
            }
            return stage;
          });
          return { ...entry, stages: updatedStages };
        }
        return entry;
      })
    );
  };
  return (
    <>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <span className="invisible">{notify}</span>
        </div>
      ) : (
        race?.data?.num_rounds && (
          <>
            <div className="flex items-center justify-center mb-2 mt-4">
              <h3 className="text-[var(--white-color)] text-2xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
                السباق
              </h3>
            </div>
            <div className="raceStart p-4 rtl:text-right overflow-x-auto bg-gray-100 rounded-md">
              <div className="flex gap-4 text-lg">
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    عدد المراحل:
                  </label>
                  <input
                    type="number"
                    id="stageCount"
                    min="1"
                    max="3"
                    disabled
                    value={race?.data?.num_rounds}
                    onChange={(e) => setStageCount(e.target.value)}
                    className="w-24 p-2 border rounded font-bold bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    المسافة الكلية (كم):
                  </label>
                  <input
                    type="number"
                    id="stageCount"
                    disabled
                    value={race?.data?.distance}
                    className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2 ">
                    أقل سرعة (كم/س):
                  </label>
                  <input
                    type="number"
                    id="stageCount"
                    disabled
                    value={race?.data?.min_speed}
                    className="w-24 p-2 border rounded font-bold bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    أقصي سرعة (كم/س):
                  </label>
                  <input
                    type="number"
                    id="stageCount"
                    disabled
                    value={race?.data?.max_speed}
                    className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
              </div>

              <table className="w-full border-collapse mb-8 text-lg font-bold">
                <thead>
                  <tr className="bg-[var(--primary-color)]">
                    <th className="border p-2 text-center w-12">#</th>
                    <th className="border p-2">اسم الفارس</th>

                    <th className="border p-2">اسم الحصان</th>
                    {race?.data?.rounds?.map((x, i) => (
                      <React.Fragment key={i}>
                        <th className="border p-2 bg-green-50" colSpan="2">
                          المرحلة {i + 1}
                        </th>
                        <th className="border p-2  " colSpan="12">
                          <span>
                            تفاصيل المرحلة {i + 1}
                            {"   "}(المسافة {x?.distance} (كم) )
                          </span>
                        </th>
                      </React.Fragment>
                    ))}
                  </tr>
                  <tr className="bg-[var(--primary-color)]">
                    <th className="border p-2 text-center" colSpan="3"></th>
                    {Array.from({ length: stageCount }, (_, i) => (
                      <React.Fragment key={i}>
                        <th className="border p-2 bg-green-50">وقت البداية</th>
                        <th className="border p-2 bg-green-50">وقت النهاية</th>
                        <th className="border p-2">المدة</th>
                        <th className="border p-2">الزمن (دقائق)</th>
                        <th className="border p-2">السرعة (كم/ساعة)</th>
                        <th className="border p-2">vet time</th>
                        <th className="border p-2">max vet time</th>
                        <th className="border p-2">pass vet time</th>
                        <th className="border p-2">Recovery</th>
                        <th className="border p-2">Qualified</th>
                        <th className="border p-2">Horse Pulse</th>
                        <th className="border p-2">وقت الراحة</th>
                        <th className="border p-2">total riding</th>
                        <th className="border p-2">Dep. Time</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="border p-2 text-center font-medium">
                        {entry.id}
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          disabled
                          value={entry.riderName}
                          onChange={(e) =>
                            setEntries(
                              entries.map((item) =>
                                item.id === entry.id
                                  ? { ...item, riderName: e.target.value }
                                  : item
                              )
                            )
                          }
                          className="w-28 p-1 border rounded"
                          placeholder="اسم الفارس"
                        />
                      </td>
                      <td className="border  p-2">
                        <input
                          type="text"
                          value={entry.horseName}
                          disabled
                          onChange={(e) =>
                            setEntries(
                              entries.map((item) =>
                                item.id === entry.id
                                  ? { ...item, horseName: e.target.value }
                                  : item
                              )
                            )
                          }
                          className="w-28 p-1 border rounded"
                          placeholder="اسم الحصان"
                        />
                      </td>

                      {entry.stages.map((stage, stageIndex) => (
                        <React.Fragment key={stageIndex}>
                          <td className="border p-2 bg-green-50">
                            <input
                              type="time"
                              value={stage.startTime}
                              onChange={(e) =>
                                handleChange(
                                  entry.id,
                                  stageIndex,
                                  e.target.value,
                                  "startTime"
                                )
                              }
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="border p-2 bg-green-50">
                            <input
                              type="time"
                              value={stage.endTime}
                              disabled={!stage.startTime}
                              onChange={(e) =>
                                handleEndTimeChange(
                                  entry.id,
                                  stageIndex,
                                  e.target.value
                                )
                              }
                              className="w-full p-1 border rounded"
                            />
                          </td>

                          <td className="border p-2">{stage.duration}</td>
                          <td className="border p-2">{stage.timeInMinutes}</td>
                          <td className="border p-2">{stage.speed}</td>
                          <td className="border p-2">{stage.vetTime}</td>
                          <td className="border p-2">{stage.lastVetTime}</td>
                          <td className="border p-2">
                            <input
                              type="time"
                              disabled={!stage.endTime}
                              value={stage.passVetTime}
                              onChange={(e) =>
                                recoveryHandle(
                                  entry.id,
                                  stageIndex,
                                  e.target.value
                                )
                              }
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="border p-2">{stage.recovery}</td>

                          <td className="border p-2 bg-green-50">
                            <input
                              type="text"
                              value={stage.qualified}
                              onChange={(e) =>
                                handleChange(
                                  entry.id,
                                  stageIndex,
                                  e.target.value,
                                  "qualified"
                                )
                              }
                              className="w-full p-1 border rounded"
                            />
                          </td>

                          <td className="border p-2 bg-green-50">
                            <input
                              type="text"
                              value={entry.pulse}
                              onChange={(e) =>
                                handleChange(
                                  entry.id,
                                  stageIndex,
                                  e.target.value,
                                  "pulse"
                                )
                              }
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="border p-2">{stage.restTime}</td>
                          <td className="border p-2 ">{stage.totalRiding}</td>
                          <td className="border p-2">{stage.finishTime}</td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </>
  );
};

export default DynamicHorseRallyAllStages;
