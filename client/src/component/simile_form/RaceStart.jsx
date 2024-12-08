import React, { useState } from "react";
import Header from "../features/Header.jsx";
const HorseRallyTable = () => {
  const [entries, setEntries] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      horseName: "",
      riderName: "",
      startTime: "",
      endTime: "",
      duration: "",
      timeInMinutes: 0,
      speed: "",
      vetTime: "00:20",
      lastVetTime: "",
      passVetTime: "",
      recovery: "",
      qualified: "",
      pulse: "",
      restTime: "00:40",
      totalRiding: "",
      finishTime: "",
    }))
  );

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

  const calculateSpeed = (timeInMinutes) => {
    if (timeInMinutes === 0) return "";
    //  speed = distance/time km/h
    const speed = 20 / (timeInMinutes / 60);
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

  const handleEndTimeChange = (id, value) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === id && entry.start != "") {
          const duration = calculateDuration(entry.startTime, value);
          const timeInMinutes = calculateTimeInMinutes(duration);
          const lastCheckTime = lastVetTimeHandle(value, entry.vetTime);
          const speed = calculateSpeed(timeInMinutes);

          return {
            ...entry,
            endTime: value,
            duration,
            timeInMinutes,
            lastVetTime: lastCheckTime,
            speed,
          };
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
  const recoveryHandle = (id, value) => {
    setEntries(
      entries.map((entry) => {
        if (entry?.id === id) {
          const recovery = recoverySum(value, entry.endTime);
          const totalRiding = totalRidingSum(entry.duration, recovery);
          const finish = finishSum(entry.restTime, value);
          console.log(finish);

          return {
            ...entry,
            passVetTime: value,
            recovery,
            totalRiding,
            finishTime: finish,
          };
        }
        return entry;
      })
    );
  };

  return (
    //   <div ref={tableRef} key={i}>
    //   <table className="w-full border-collapse mb-8 text-[15px] font-bold">
    //     <thead>
    //       <tr className="bg-[var(--primary-color)]">
    //         <th className="border p-2 text-center w-12">#</th>
    //         <th className="border p-2">اسم الفارس</th>

    //         <th className="border p-2">اسم الحصان</th>
    //         {race?.data?.rounds?.map((x, i) => (
    //           <React.Fragment key={i}>
    //             <th className="border p-2 bg-green-50" colSpan="2">
    //               المرحلة {i + 1}
    //             </th>
    //             <th className="border p-2  " colSpan="12">
    //               <span>
    //                 تفاصيل المرحلة {i + 1}
    //                 {"   "}(المسافة {x?.distance} (كم) )
    //               </span>
    //             </th>
    //           </React.Fragment>
    //         ))}
    //       </tr>
    //       <tr className="bg-[var(--primary-color)]">
    //         <th className="border p-2 text-center" colSpan="3"></th>

    //         <React.Fragment key={i}>
    //           <th className="border p-2 bg-green-50">
    //             وقت البداية
    //           </th>
    //           <th className="border p-2 bg-green-50">
    //             وقت النهاية
    //           </th>
    //           <th className="border p-2">المدة</th>
    //           <th className="border p-2">الزمن (دقائق)</th>
    //           <th className="border p-2">السرعة (كم/ساعة)</th>
    //           {/* <th className="border p-2">vet time</th> */}
    //           <th className="border p-2">max vet time</th>
    //           <th className="border p-2">pass vet time</th>
    //           <th className="border p-2">Recovery</th>
    //           <th className="border p-2">Qualified</th>
    //           <th className="border p-2">Horse Pulse</th>
    //           {/* <th className="border p-2">وقت الراحة</th> */}
    //           <th className="border p-2">total riding</th>
    //           <th className="border p-2">Dep. Time</th>
    //         </React.Fragment>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr key={entry.id} className="hover:bg-gray-50">
    //         <td className="border p-2 text-center font-medium">
    //           {entry.id}
    //         </td>
    //         <td className="border p-2">
    //           <input
    //             type="text"
    //             disabled
    //             value={entry.riderName}
    //             onChange={(e) =>
    //               setEntries(
    //                 entries.map((item) =>
    //                   item.id === entry.id
    //                     ? { ...item, riderName: e.target.value }
    //                     : item
    //                 )
    //               )
    //             }
    //             className="w-28 p-1 border rounded"
    //             placeholder="اسم الفارس"
    //           />
    //         </td>
    //         <td className="border  p-2">
    //           <input
    //             type="text"
    //             value={entry.horseName}
    //             disabled
    //             onChange={(e) =>
    //               setEntries(
    //                 entries.map((item) =>
    //                   item.id === entry.id
    //                     ? { ...item, horseName: e.target.value }
    //                     : item
    //                 )
    //               )
    //             }
    //             className="w-28 p-1 border rounded"
    //             placeholder="اسم الحصان"
    //           />
    //         </td>

    //         {entry.stages.map((stage, stageIndex) => (
    //           <React.Fragment key={stageIndex}>
    //             <td className="border p-2 bg-green-50">
    //               <input
    //                 type="time"
    //                 value={stage.startTime}
    //                 onChange={(e) =>
    //                   handleChange(
    //                     entry.id,
    //                     stageIndex,
    //                     e.target.value,
    //                     "startTime"
    //                   )
    //                 }
    //                 className="w-full p-1 border rounded"
    //               />
    //             </td>
    //             <td className="border p-2 bg-green-50">
    //               <input
    //                 type="time"
    //                 value={stage.endTime}
    //                 disabled={!stage.startTime}
    //                 onChange={(e) =>
    //                   handleEndTimeChange(
    //                     entry.id,
    //                     stageIndex,
    //                     e.target.value
    //                   )
    //                 }
    //                 className="w-full p-1 border rounded"
    //               />
    //             </td>

    //             <td className="border p-2">{stage.duration}</td>
    //             <td className="border p-2">
    //               {stage.timeInMinutes}
    //             </td>
    //             <td
    //               className={`w-full p-1 border rounded text-center ${
    //                 stage?.speed == 0 && stage?.timeInMinutes == 0
    //                   ? "bg-gray-50"
    //                   : (stage?.timeInMinutes != 0 &&
    //                       stage.speed > race?.data?.max_speed) ||
    //                     (stage?.timeInMinutes != 0 &&
    //                       stage.speed < race?.data?.min_speed)
    //                   ? "bg-red-500"
    //                   : (stage?.timeInMinutes != 0 &&
    //                       stage.speed >= race?.data?.min_speed) ||
    //                     (stage?.timeInMinutes != 0 &&
    //                       stage.speed <= race?.data?.max_speed)
    //                   ? "bg-green-500"
    //                   : "bg-gray-50"
    //               }`}>
    //               {stage.speed}
    //             </td>
    //             {/* <td className="border p-2">{stage.vetTime}</td> */}
    //             <td className="border p-2">{stage.lastVetTime}</td>
    //             <td className="border p-2">
    //               <input
    //                 type="time"
    //                 disabled={!stage.endTime}
    //                 value={stage.passVetTime}
    //                 onChange={(e) =>
    //                   recoveryHandle(
    //                     entry.id,
    //                     stageIndex,
    //                     e.target.value
    //                   )
    //                 }
    //                 className="w-full p-1 border rounded"
    //               />
    //             </td>
    //             <td className="border p-2">{stage.recovery}</td>

    //             <td className="border p-2 bg-green-50">
    //               <input
    //                 type="text"
    //                 value={stage.qualified}
    //                 onChange={(e) =>
    //                   handleChange(
    //                     entry.id,
    //                     stageIndex,
    //                     e.target.value,
    //                     "qualified"
    //                   )
    //                 }
    //                 className={`w-full p-1 border rounded text-center ${
    //                   stage.qualified == "Q"
    //                     ? "bg-green-500"
    //                     : stage.qualified == "E"
    //                     ? "bg-red-500"
    //                     : "bg-slate-50"
    //                 }`}
    //               />
    //             </td>

    //             <td
    //               className={`w-full p-1 border rounded text-center `}>
    //               <input
    //                 type="number"
    //                 value={entry.pulse}
    //                 onChange={(e) =>
    //                   handleChange(
    //                     entry.id,
    //                     stageIndex,
    //                     e.target.value,
    //                     "pulse"
    //                   )
    //                 }
    //                 className={`w-full p-1 border rounded text-center ${
    //                   stage.pulse == ""
    //                     ? "bg-gray-50"
    //                     : Number(stage.pulse) <=
    //                       Number(race?.data?.pulse)
    //                     ? "bg-green-500"
    //                     : Number(stage.pulse) >
    //                       Number(race?.data?.pulse)
    //                     ? "bg-red-500"
    //                     : "bg-gray-50"
    //                 }`}
    //               />
    //             </td>
    //             {/* <td className="border p-2">{stage.restTime}</td> */}
    //             <td className="border p-2 ">{stage.totalRiding}</td>
    //             <td className="border p-2">{stage.finishTime}</td>
    //           </React.Fragment>
    //         ))}
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
    <div className="raceStart bg-gray-100 p-4 rtl:text-right overflow-x-auto overscroll-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--primary-color)]">
            <th className="border p-2 text-center w-12">#</th>
            <th className="border p-2">اسم الحصان</th>
            <th className="border p-2">اسم الفارس</th>
            <th className="border p-2 bg-green-50">وقت البداية</th>
            <th className="border p-2 bg-green-50">وقت النهاية</th>
            <th className="border p-2">المدة</th>
            <th className="border p-2">الزمن (دقائق)</th>
            <th className="border p-2">السرعة (كم/ساعة)</th>
            <th className="border p-2">vet time</th>
            <th className="border p-2">آخر ميعاد للكشف</th>
            <th className="border p-2">pass vet time</th>
            <th className="border p-2">Recovery</th>
            <th className="border p-2">Qualified</th>
            <th className="border p-2">Horse Pulse</th>
            <th className="border p-2">وقت الراحة</th>
            <th className="border p-2">total riding</th>
            <th className="border p-2">Dep. Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry?.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center font-medium">
                {entry?.id}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.horseName}
                  onChange={(e) =>
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id
                          ? { ...item, horseName: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full p-1 border rounded"
                  placeholder="اسم الحصان"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
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
                  className="w-full p-1 border rounded"
                  placeholder="اسم الفارس"
                />
              </td>
              <td className="border p-2 bg-green-50">
                <input
                  type="time"
                  value={entry.startTime}
                  onChange={(e) =>
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id
                          ? { ...item, startTime: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2 bg-green-50">
                <input
                  type="time"
                  value={entry.endTime}
                  disabled={!entry.startTime}
                  onChange={(e) =>
                    handleEndTimeChange(entry.id, e.target.value)
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">{entry.duration}</td>
              <td className="border p-2">{entry.timeInMinutes}</td>
              <td className="border p-2">{entry.speed}</td>
              <td className="border p-2">{entry.vetTime}</td>
              <td className="border p-2">{entry.lastVetTime}</td>
              <td className="border p-2">
                <input
                  type="time"
                  disabled={!entry.endTime}
                  value={entry.passVetTime}
                  onChange={(e) => recoveryHandle(entry.id, e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">{entry.recovery}</td>

              <td className="border p-2 bg-green-50">
                <input
                  type="text"
                  value={entry.qualified}
                  onChange={(e) =>
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id
                          ? { ...item, qualified: e.target.value }
                          : item
                      )
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
                    setEntries(
                      entries.map((item) =>
                        item.id === entry.id
                          ? { ...item, pulse: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">{entry.restTime}</td>
              <td className="border p-2 ">{entry.totalRiding}</td>
              <td className="border p-2">{entry.finishTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorseRallyTable;
