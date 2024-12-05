import React, { useEffect, useState } from "react";
import Header from "../../component/features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRace } from "../../redux/slicers/raceSlicer";
import Loader from "../../component/features/Loader";
import { toast } from "react-toastify";
const Champion = () => {
  const dispatch = useDispatch();
  const [levels, setLevels] = useState(0);
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(0);
  const [min_speed, setMin] = useState(0);
  const [max_speed, setMax] = useState(0);
  const [vite_time, setVite] = useState(0);
  const [rest, setRest] = useState(0);
  const [address, setAddress] = useState("");
  const [arrLevels, setArrLevels] = useState(null);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    if (levels) {
      setArrLevels(
        new Array(Number(levels)).fill({
          distance: 0,
        })
      );
    }
  }, [levels]);
  const handleChange = (i, field, value) => {
    setArrLevels((arrLevels) =>
      arrLevels.map((person, index) =>
        index === i
          ? {
              ...person,
              [field]: field === "spedd" ? parseInt(value) || 0 : value,
            }
          : person
      )
    );
  };
  const raceSlice = useSelector((state) => state.raceSlice);
  const { race, loading, error, success } = raceSlice;
  const navigator = useNavigate();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("vite_time", vite_time);
    formData.append("rest_time", rest);
    formData.append("distance", distance);
    formData.append("min_speed", min_speed);
    formData.append("max_speed", max_speed);
    formData.append("num_rounds", levels);
    formData.append("rounds", arrLevels);
    formData.append("address", address);
    console.log(arrLevels);
    const row = {
      date,
      vite_time: `00:${vite_time.toString().padStart(2, "0")}`,
      rest_time: `00:${rest.toString().padStart(2, "0")}`,
      distance,
      min_speed,
      max_speed,
      num_rounds: levels,
      rounds: arrLevels,
      address: address,
    };
    console.log(row);

    dispatch(addRace(row));
    if (success) {
      setNotify(toast.success("تم اضافة بيانات المسابقة"));
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
      <div className="max-w-4xl mx-auto font-[sans-serif] mt-10 bg-white p-10 shadow-lg rounded-md">
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
            المسابقة
          </h3>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-2">
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              التاريخ
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              placeholder="التاريخ"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
            />
          </div>
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              المكان
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="المكان"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              المسافة/ كم
            </label>
            <input
              min={0}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              type="number"
              placeholder="المسافة"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              حد أدنى للسرعة/ كم
            </label>
            <input
              min={0}
              value={min_speed}
              onChange={(e) => setMin(e.target.value)}
              type="number"
              placeholder="حد أدنى للسرعة"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              حد أقصى للسرعة/ كم
            </label>
            <input
              min={0}
              value={max_speed}
              onChange={(e) => setMax(e.target.value)}
              type="number"
              placeholder="حد أقصى للسرعة"
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>

          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              vet time
            </label>
            <input
              // type="time"
              min={0}
              max={59}
              placeholder="vet time"
              type="number"
              value={vite_time}
              onChange={(e) => setVite(e.target.value)}
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              rest time
            </label>
            <input
              min={0}
              max={59}
              type="number"
              placeholder="rest time"
              value={rest}
              onChange={(e) => setRest(e.target.value)}
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>
          <div className="items-center">
            <label className="text-[18px] text-[var(--dark-color)] font-bold">
              عدد المراحل
            </label>
            <input
              min={0}
              type="number"
              max={3}
              placeholder="المراحل"
              value={levels}
              onChange={(e) => setLevels(e.target.value)}
              className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-2">
          {arrLevels?.map((x, i) => (
            <div key={i} className="bg-blue-100 p-2 flex flex-col">
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  مسافة المرحلة {i + 1}
                </label>
                <input
                  min={0}
                  value={x.distance}
                  onChange={(e) => handleChange(i, "distance", e.target.value)}
                  type="number"
                  placeholder=""
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all"
          onClick={() => handleSubmit()}>
          {loading ? <Loader /> : "حفظ"}
        </button>
      </div>
    </div>
  );
};

export default Champion;
