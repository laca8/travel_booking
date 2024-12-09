import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Printer } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../features/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editStageRace, fetchRace } from "../../redux/slicers/raceSlicer";
import vision from "../../assets/img/vision.jpg";
import equ from "../../assets/img/equ.jpg";
const DynamicHorseRallyAllStages = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRace(id));
  }, [id]);
  const raceSlice = useSelector((state) => state.raceSlice);
  const { race, loading, error, success } = raceSlice;
  const [stageCount, setStageCount] = useState(race?.data?.num_rounds);

  const [notify, setNotify] = useState("");
  const [timeStart, setTimeStart] = useState("");

  const [entries, setEntries] = useState(() => {
    const savedStages = localStorage.getItem(`raceStages-${id}`);
    return savedStages ? JSON.parse(savedStages) : race?.data?.entries;
  });
  useEffect(() => {
    localStorage.setItem(`raceStages-${id}`, JSON.stringify(entries));
  }, [entries]);
  // useEffect(() => {
  //   localStorage.setItem("raceStages", JSON.stringify(entries));
  // }, [entries]);

  // useEffect(() => {
  //   const initialEntries = Array.from(
  //     { length: race?.data?.players?.length },
  //     (_, i) => ({
  //       id:
  //         race?.data?.players?.length != 0
  //           ? race?.data?.players?.map((x, index) => {
  //               if (index === i) {
  //                 return x.num;
  //               }
  //             })[i]
  //           : "",
  //       horseName:
  //         race?.data?.players?.length != 0
  //           ? race?.data?.players?.map((x, index) => {
  //               if (index === i) {
  //                 const res = x.horse;
  //                 console.log(x.horse);
  //                 return res;
  //               }
  //             })[i]
  //           : "",

  //       riderName:
  //         race?.data?.players?.length != 0
  //           ? race?.data?.players?.map((x, index) => {
  //               if (index === i) {
  //                 return x.knight;
  //               }
  //             })[i]
  //           : "",
  //       stages: Array.from({ length: stageCount }, (_, j) => ({
  //         startTime: j == 0 ? timeStart : "",
  //         endTime: "",
  //         duration: "",
  //         timeInMinutes: 0,
  //         speed: 0,
  //         vetTime: race?.data != null ? race?.data?.vite_time : "",
  //         lastVetTime: "",
  //         passVetTime: "",
  //         recovery: "",
  //         qualified: "",
  //         pulse: "",
  //         restTime: race?.data != null ? race?.data?.rest_time : "",
  //         totalRiding: "",
  //         finishTime: "",
  //       })),
  //     })
  //   );
  //   setEntries(initialEntries);
  // }, [stageCount, id, timeStart]);

  const calculateDuration = (start, end) => {
    console.log(start, end);

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
  const updateNextStageOrder = (stageIndex) => {
    if (stageIndex + 1 >= entries.length) return;

    const currentStage = entries[stageIndex];
    const nextStage = entries[stageIndex + 1];

    // Sort riders by endTime in current stage
    const sortedRiders = [...currentStage.riders]
      .filter((rider) => rider.finishTime) // Only include riders who finished
      .sort((a, b) => {
        const timeA = new Date(`2024-01-01 ${a.finishTime}`);
        const timeB = new Date(`2024-01-01 ${b.finishTime}`);
        return timeA - timeB;
      });

    // Update order and start times in next stage
    const updatedNextStageRiders = nextStage.riders.map((rider) => {
      const finishedRiderIndex = sortedRiders.findIndex(
        (r) => r.id === rider.id
      );
      if (finishedRiderIndex !== -1) {
        const finishedRider = sortedRiders[finishedRiderIndex];
        return {
          ...rider,
          order: finishedRiderIndex,
          startTime: finishedRider.finishTime, // Set start time to previous stage's end time
        };
      }
      return {
        ...rider,
        order: sortedRiders.length, // Put non-finished riders at the end
      };
    });

    // Sort the next stage riders by order
    updatedNextStageRiders.sort((a, b) => a.order - b.order);
    console.log(updatedNextStageRiders);

    setEntries((prevStages) => {
      const newStages = [...prevStages];
      console.log(newStages);

      newStages[stageIndex + 1].riders = updatedNextStageRiders;
      return newStages;
    });
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

  const lastVetTimeHandle = (arrive, vetTime) => {
    console.log(arrive, vetTime);

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
  const handleEndTimeChange = (riderId, stageIndex, value) => {
    setEntries((prevStages) => {
      const newStages = [...prevStages];
      const rider = newStages[stageIndex].riders.find((r) => r.id === riderId);

      rider["endTime"] = value;

      if (rider.startTime && rider.endTime) {
        rider.duration = calculateDuration(rider.startTime, rider.endTime);
        rider.timeInMinutes = calculateTimeInMinutes(rider.duration);
        rider.speed = calculateSpeed(stageIndex, rider.timeInMinutes);
        rider.lastVetTime = lastVetTimeHandle(value, race?.data?.vite_time);
      }

      return newStages;
    });

    //     if (entry.id === entryId) {
    //       const updatedStages = entry.stages.map((stage, index) => {
    //         if (index === stageIndex) {
    //           const duration = calculateDuration(stage.startTime, value);
    //           console.log(duration);
    //           const timeInMinutes = calculateTimeInMinutes(duration);
    //           const lastCheckTime = lastVetTimeHandle(
    //             value,
    //             race?.data?.vite_time
    //           );
    //           const speed = calculateSpeed(index, timeInMinutes);

    //           return {
    //             ...stage,
    //             endTime: value,
    //             duration,
    //             timeInMinutes,
    //             lastVetTime: lastCheckTime,
    //             speed,
    //           };
    //         }
    //         return stage;
    //       });

    //       return { ...entry, stages: updatedStages };
    //     }
    //     return entry;
    //   })
    // );
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
  const qualifySum = (value, max) => {
    if (max >= value) {
      return "Q";
    } else {
      return "E";
    }
  };
  const recoveryHandle = (riderId, stageIndex, value) => {
    setEntries((prevStages) => {
      const newStages = [...prevStages];
      const rider = newStages[stageIndex]?.riders?.find(
        (r) => r.id === riderId
      );

      rider["passVetTime"] = value;

      if (rider?.passVetTime != "") {
        rider.recovery = recoverySum(value, rider.endTime);
        rider.totalRiding = totalRidingSum(rider.duration, rider.recovery);
        rider.finishTime = finishSum(rider.restTime, value);
        rider.qualified = qualifySum(value, rider.lastVetTime);
        if (rider.finishTime != "") {
          setTimeout(() => updateNextStageOrder(stageIndex), 0);
        }
      }

      return newStages;
    });
    // setEntries(
    //   entries.map((entry, eIndex) => {
    //     if (stageIndex === eIndex) {
    //       const updatedStages = entry.riders.map((stage, index) => {
    //         if (stage.id === entryId) {
    //           const recovery = recoverySum(value, stage.endTime);
    //           const totalRiding = totalRidingSum(stage.duration, recovery);
    //           const finish = finishSum(stage.restTime, value);
    //           const qualified = qualifySum(value, stage.lastVetTime);
    //           return {
    //             ...stage,
    //             passVetTime: value,
    //             recovery,
    //             qualified,
    //             totalRiding,
    //             finishTime: finish,
    //           };
    //         }
    //         if (index === stageIndex + 1) {
    //           console.log(stage.finishTime);
    //           return {
    //             ...stage,
    //             startTime: finishSum(stage.restTime, value),
    //           };
    //         }
    //         return stage;
    //       });
    //       return { ...entry, riders: updatedStages };
    //     }
    //     return entry;
    //   })
    // );
  };

  const handleChange = (riderId, stageIndex, value, field) => {
    setEntries((prevStages) => {
      const newStages = [...prevStages];
      const rider = newStages[stageIndex].riders.find((r) => r.id === riderId);
      rider[field] = value;
      return newStages;
    });

    //   entries.map((entry) =>
    //     entry.riders.map((x, i) => {
    //       if (x.id === entryId) {
    //         const updatedStages = entry.riders.map((stage, index) => {
    //           if (index === stageIndex) {
    //             return {
    //               ...stage,
    //               [field]: value,
    //             };
    //           }
    //           return stage;
    //         });
    //         return { ...entry, riders: updatedStages };
    //       }
    //       return entry;
    //     })
    //   )
    // );
    // setEntries(
    //   entries.map((entry) => {
    //     if (entry.id === entryId) {
    //       const updatedStages = entry.stages.map((stage, index) => {
    //         if (index === stageIndex) {
    //           return {
    //             ...stage,
    //             [field]: value,
    //           };
    //         }
    //         return stage;
    //       });
    //       return { ...entry, stages: updatedStages };
    //     }
    //     return entry;
    //   })
    // );
  };

  const printStage = (stageIndex) => {
    // const printContent = document.getElementById(`stage-${stageIndex}`);
    // const originalContent = document.body.innerHTML;

    // Create print-specific styles
    const style = document.createElement("style");
    style.textContent = `
        @media print {
          body * {
            visibility: hidden;
            font-size:10px;
          
          }
          #stage-${stageIndex}, #stage-${stageIndex}  * {
            visibility: visible;
          }
            
          
          #stage-${stageIndex} {
            position: absolute;
            left: 0;
            top: 0;
            width:100;
          padding:10px;
            margin:auto;
            border-collapse: collapse;
          }
          .no-print {
            display: none !important;
          }
         #stage-${stageIndex} table {
        background-color: whitesmoke;
              width: 85%;
            margin:auto;


      
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: right;
          }
          th {
            background-color: #f0f0f0;
          }
          @page {
            size: landscape;
            margin: 2cm;
          }
        }
      `;

    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };
  const handleStartTime = (value) => {
    setTimeStart((prev) => {
      prev: value;
    });
    setEntries((prevStages) => {
      const newStages = [...prevStages];
      const rider = newStages[0].riders.map((x) => {
        if (x.startTime == "") {
          x["startTime"] = value;
        }
      });

      return newStages;
    });
  };

  const handleSave = () => {
    const row = {
      id: id,
      entries: JSON.parse(localStorage.getItem(`raceStages-${id}`)),
    };
    console.log(row);

    dispatch(editStageRace(row));
    dispatch(fetchRace(id));
    setNotify(toast.success("تم حفظ البيانات"));
  };
  const printAllStages = () => {
    window.print();
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
              <div className="flex flex-wrap gap-4 text-[13px]">
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
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    النبض
                  </label>
                  <input
                    type="number"
                    id="stageCount"
                    disabled
                    value={race?.data?.pulse}
                    className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    vet time
                  </label>
                  <input
                    type="text"
                    id="stageCount"
                    disabled
                    value={race?.data?.vite_time}
                    className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    rest time
                  </label>
                  <input
                    type="text"
                    id="stageCount"
                    disabled
                    value={race?.data?.rest_time}
                    className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold text-gray-700 mb-2">
                    start
                  </label>
                  <input
                    type="time"
                    value={timeStart}
                    onChange={(e) => handleStartTime(e.target.value)}
                    className="w-28 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                  />
                </div>
                {race?.data?.rounds?.map((x, i) => (
                  <div className="mb-4" key={i}>
                    <label
                      htmlFor="stageCount"
                      className="block font-bold text-gray-700 mb-2">
                      أقصي زمن للمرحلة {i + 1}
                    </label>
                    <input
                      type="text"
                      id="stageCount"
                      disabled
                      value={` ${(
                        (x.distance / race?.data?.max_speed) *
                        60
                      ).toFixed(0)} دقيقة`}
                      className="w-24 p-2 border rounded font-bold  bg-yellow-300 text-black text-center"
                    />
                  </div>
                ))}
                <div className="mb-4">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold  mb-2 text-white">
                    save
                  </label>
                  <button
                    onClick={() => handleSave()}
                    className="bg-[var(--dark-color)] p-2 text-white w-24 rounded-md hover:scale-95 transition-all font-bold ">
                    حفظ
                  </button>
                </div>
                <div className="mb-4  justify-between items-center">
                  <label
                    htmlFor="stageCount"
                    className="block font-bold  mb-2 text-white">
                    save
                  </label>
                  <button
                    onClick={() => printAllStages()}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 no-print">
                    <Printer size={20} />
                    طباعة جميع المراحل
                  </button>
                </div>
              </div>

              {entries.map((stage, stageIndex) => (
                <div
                  key={stage.id}
                  className="mb-8 border rounded-lg p-4 bg-white shadow w-full overflow-x-auto">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Round {stage.id + 1}</h2>
                    <button
                      onClick={() => printStage(stageIndex)}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 no-print">
                      <Printer size={20} />
                      Print Round
                    </button>
                  </div>
                  <div id={`stage-${stageIndex}`} className="bg-white ">
                    <div className="hidden print:block w-[97%] m-auto bg-[white]  text-black">
                      <div className="flex items-center justify-between mb-4 ">
                        <img src={equ} alt="شعار المؤسسة" className="h-32" />

                        <h1 className="text-xl font-bold">
                          Egyptian Equestrian Federation
                        </h1>

                        <img src={vision} alt="شعار المؤسسة" className="h-14" />
                      </div>
                      <hr className="border-t border-gray-300" />
                    </div>
                    <table className="w-full border-collapse p-4">
                      <thead>
                        <tr className="bg-[var(--primary-color)]">
                          <th className="border p-2 text-center w-12">#</th>
                          <th className="border p-2">Rider Name</th>

                          <th className="border p-2">Horse</th>

                          <React.Fragment key={stageIndex}>
                            <th className="border p-2 bg-green-50" colSpan="2">
                              Round {stageIndex + 1}
                            </th>
                            <th className="border p-2  " colSpan="10">
                              <span>
                                Round {stageIndex + 1} Details (distance{" "}
                                {stage?.distance} (km) )
                              </span>
                            </th>
                          </React.Fragment>
                        </tr>
                        <tr className="bg-[var(--primary-color)]">
                          <th
                            className="border p-2 text-center"
                            colSpan="3"></th>

                          <React.Fragment key={stageIndex}>
                            <th className="border p-2 bg-green-50">Start</th>
                            <th className="border p-2 bg-green-50">
                              Arrival Time
                            </th>
                            <th className="border p-2 w-20">Riding Time</th>
                            <th className="border p-2 w-20">Minutes Time</th>
                            <th className="border p-2 w-20">Speed (km/h)</th>
                            {/* <th className="border p-2">vet time</th> */}
                            <th className="border p-2 w-20">max vet time</th>
                            <th className="border p-2 w-20">pass vet time</th>
                            <th className="border p-2 w-20">Recovery</th>
                            <th className="border p-2 w-20">Qualified</th>
                            <th className="border p-2 w-20">Horse Pulse</th>
                            {/* <th className="border p-2">وقت الراحة</th> */}
                            <th className="border p-2 w-20">total riding</th>
                            <th className="border p-2 w-20">Dep. Time</th>
                          </React.Fragment>
                        </tr>
                      </thead>
                      <tbody>
                        {stage?.riders?.map((rider, index) => (
                          <tr key={index}>
                            <React.Fragment key={stageIndex}>
                              <td className="border p-2 text-center font-medium">
                                {rider.id}
                              </td>
                              <td className="border p-2">
                                <input
                                  type="text"
                                  disabled
                                  value={rider.riderName}
                                  className="w-28 p-1 border rounded"
                                  placeholder="اسم الفارس"
                                />
                              </td>
                              <td className="border  p-2">
                                <input
                                  type="text"
                                  value={rider.horseName}
                                  disabled
                                  className="w-28 p-1 border rounded"
                                  placeholder="اسم الحصان"
                                />
                              </td>
                              <td className="border p-2 bg-green-50">
                                <input
                                  type="time"
                                  value={rider.startTime}
                                  onChange={(e) =>
                                    handleChange(
                                      rider.id,
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
                                  value={rider.endTime}
                                  disabled={!rider.startTime}
                                  onChange={(e) =>
                                    handleEndTimeChange(
                                      rider.id,
                                      stageIndex,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-1 border rounded"
                                />
                              </td>

                              <td className="border p-2">{rider.duration}</td>
                              <td className="border p-2">
                                {rider.timeInMinutes}
                              </td>
                              <td
                                className={`w-28 p-1 border rounded text-center ${
                                  rider?.speed == 0 && rider?.timeInMinutes == 0
                                    ? "bg-gray-50"
                                    : (rider?.timeInMinutes != 0 &&
                                        rider.speed > race?.data?.max_speed) ||
                                      (rider?.timeInMinutes != 0 &&
                                        rider.speed < race?.data?.min_speed)
                                    ? "bg-red-500"
                                    : (rider?.timeInMinutes != 0 &&
                                        rider.speed >= race?.data?.min_speed) ||
                                      (rider?.timeInMinutes != 0 &&
                                        rider.speed <= race?.data?.max_speed)
                                    ? "bg-gray-50" //"bg-green-500"
                                    : "bg-gray-50"
                                }`}>
                                {rider.speed}
                              </td>
                              {/* <td className="border p-2">{rider.vetTime}</td> */}
                              <td className="border p-2">
                                {rider.lastVetTime}
                              </td>
                              <td className="border p-2">
                                <input
                                  type="time"
                                  disabled={!rider.endTime}
                                  value={rider.passVetTime}
                                  onChange={(e) =>
                                    recoveryHandle(
                                      rider.id,
                                      stageIndex,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-1 border rounded"
                                />
                              </td>
                              <td className="border p-2">{rider.recovery}</td>

                              <td className="border p-2 bg-green-50">
                                <input
                                  type="text"
                                  value={rider.qualified}
                                  onChange={(e) =>
                                    handleChange(
                                      rider.id,
                                      stageIndex,
                                      e.target.value,
                                      "qualified"
                                    )
                                  }
                                  className={`w-full p-1 border rounded text-center ${
                                    rider.qualified == "Q"
                                      ? "bg-gray-50" //"bg-green-500"
                                      : rider.qualified == "E"
                                      ? "bg-red-500"
                                      : "bg-gray-50"
                                  }`}
                                />
                              </td>

                              <td
                                className={`w-full p-1 border rounded text-center `}>
                                <input
                                  type="number"
                                  value={rider.pulse}
                                  onChange={(e) =>
                                    handleChange(
                                      rider.id,
                                      stageIndex,
                                      e.target.value,
                                      "pulse"
                                    )
                                  }
                                  className={`w-28 p-1 border rounded text-center ${
                                    rider.pulse == ""
                                      ? "bg-gray-50"
                                      : Number(rider.pulse) <=
                                        Number(race?.data?.pulse)
                                      ? "bg-gray-50" //"bg-green-500"
                                      : Number(rider.pulse) >
                                        Number(race?.data?.pulse)
                                      ? "bg-red-500"
                                      : "bg-gray-50"
                                  }`}
                                />
                              </td>
                              {/* <td className="border p-2">{rider.restTime}</td> */}
                              <td className="border p-2 ">
                                {rider.totalRiding}
                              </td>
                              <td className="border p-2">{rider.finishTime}</td>
                            </React.Fragment>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot dir="ltr">
                        <tr>
                          <td
                            className="border p-2 text-md font-bold  text-red-500 text-left"
                            colSpan="6">
                            (
                            {
                              stage?.riders?.filter((x) => x.qualified == "E")
                                ?.length
                            }{" "}
                            Disqualified) ={" "}
                            {`${(
                              (Number(
                                stage?.riders?.filter((x) => x.qualified == "E")
                                  ?.length
                              ) *
                                100) /
                              Number(stage?.riders?.length)
                            ).toFixed(0)} %`}
                            ))
                          </td>

                          <td
                            className="border p-2 text-md font-bold  text-green-500 text-left"
                            colSpan="6">
                            (
                            {
                              stage?.riders?.filter((x) => x.qualified == "Q")
                                ?.length
                            }{" "}
                            Passes = ({" "}
                            {`${(
                              (Number(
                                stage?.riders?.filter((x) => x.qualified == "Q")
                                  ?.length
                              ) *
                                100) /
                              Number(stage?.riders?.length)
                            ).toFixed(0)} %`}
                            ))
                          </td>
                          <td
                            className="border p-2 text-md font-bold text-left"
                            colSpan="3">
                            (Total Riders {stage?.riders?.length})
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default DynamicHorseRallyAllStages;
