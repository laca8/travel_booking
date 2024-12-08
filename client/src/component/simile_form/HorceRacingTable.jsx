import { useState, useEffect } from "react";
const DISTANCE = 20; // km

function HorseRacingTable({ stage, entries, setEntries }) {
  const calculateDuration = (start, end) => {
    const startDate = new Date(`2024/01/01 ${start}`);
    const endDate = new Date(`2024/01/01 ${end}`);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // in hours
  };

  const calculateSpeed = (distance, durationMinutes) => {
    return distance / (durationMinutes / 60); // km/h
  };

  const handleInputChange = (id, field, value) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleEndTimeChange = (id, newEndTime) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => {
        if (entry.id === id) {
          const duration = calculateDuration(entry.startTime, newEndTime);
          const durationMinutes = duration * 60;
          const speed = calculateSpeed(DISTANCE, durationMinutes);
          return {
            ...entry,
            endTime: newEndTime,
            duration,
            durationMinutes,
            speed,
          };
        }
        return entry;
      })
    );
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto mb-8" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">المرحلة {stage}</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-primary/5">
            <th className="border p-2 text-right">رقم</th>
            <th className="border p-2 text-right">اسم الحصان</th>
            <th className="border p-2 text-right">اسم الفارس</th>
            <th className="border p-2 text-right">وقت البداية</th>
            <th className="border p-2 text-right">وقت النهاية</th>
            <th className="border p-2 text-right">المدة (ساعات)</th>
            <th className="border p-2 text-right">الزمن (دقائق)</th>
            <th className="border p-2 text-right">السرعة (كم/ساعة)</th>
            <th className="border p-2 text-right">وقت الكشف</th>
            <th className="border p-2 text-right">آخر ميعاد للكشف</th>
            <th className="border p-2 text-right">وقت الراحة</th>
            <th className="border p-2 text-right">المجموع</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-muted/50">
              <td className="border p-2 text-right">{entry.id}</td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full bg-transparent"
                  value={entry.horseName}
                  onChange={(e) =>
                    handleInputChange(entry.id, "horseName", e.target.value)
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full bg-transparent"
                  value={entry.riderName}
                  onChange={(e) =>
                    handleInputChange(entry.id, "riderName", e.target.value)
                  }
                />
              </td>
              <td className="border p-2 text-right">{entry.startTime}</td>
              <td className="border p-2">
                <input
                  type="time"
                  className="w-full bg-transparent"
                  value={entry.endTime}
                  onChange={(e) =>
                    handleEndTimeChange(entry.id, e.target.value)
                  }
                />
              </td>
              <td className="border p-2 text-right">
                {entry.duration.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {entry.durationMinutes.toFixed(0)}
              </td>
              <td className="border p-2 text-right">
                {entry.speed.toFixed(2)}
              </td>
              <td className="border p-2 text-right">{entry.checkTime}</td>
              <td className="border p-2 text-right">{entry.lastCheckTime}</td>
              <td className="border p-2 text-right">{entry.restTime}</td>
              <td className="border p-2 text-right">{entry.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HorseRacingTables() {
  const [stages, setStages] = useState(() => {
    const savedStages = localStorage.getItem("horseRacingStages");
    return savedStages ? JSON.parse(savedStages) : [2];
  });

  const [allEntries, setAllEntries] = useState(() => {
    const savedEntries = localStorage.getItem("horseRacingEntries");
    return savedEntries ? JSON.parse(savedEntries) : {};
  });

  useEffect(() => {
    localStorage.setItem("horseRacingStages", JSON.stringify(stages));
    localStorage.setItem("horseRacingEntries", JSON.stringify(allEntries));
  }, [stages, allEntries]);

  const addStage = () => {
    const newStage = Math.max(...stages) + 1;
    setStages([...stages, newStage]);
    setAllEntries({
      ...allEntries,
      [newStage]: Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        horseName: "",
        riderName: "",
        startTime: index === 0 ? "6:00:00 AM" : "7:00:05 AM",
        endTime: "",
        duration: 0,
        durationMinutes: 0,
        speed: 0,
        checkTime: "",
        lastCheckTime: "",
        restTime: "",
        total: 0,
      })),
    });
  };

  const removeStage = () => {
    if (stages.length > 1) {
      const newStages = [...stages];
      const removedStage = newStages.pop();
      setStages(newStages);
      const newAllEntries = { ...allEntries };
      delete newAllEntries[removedStage];
      setAllEntries(newAllEntries);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={addStage}
          className="bg-green-500 hover:bg-green-600 text-white">
          إضافة مرحلة
        </button>
        <button
          onClick={removeStage}
          className="bg-red-500 hover:bg-red-600 text-white"
          disabled={stages.length === 1}>
          حذف مرحلة
        </button>
      </div>
      {stages.map((stage) => (
        <HorseRacingTable
          key={stage}
          stage={stage}
          entries={allEntries[stage] || []}
          setEntries={(newEntries) =>
            setAllEntries({ ...allEntries, [stage]: newEntries })
          }
        />
      ))}
    </div>
  );
}
