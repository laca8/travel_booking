import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Header from "../features/Header";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../features/Loader";
import { fetchHorses } from "../../redux/slicers/horseSlicer";
import { NavLink, useNavigate } from "react-router-dom";

const SimpleHorsesListing = () => {
  const navigator = useNavigate();
  const [type, setType] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");

  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const horseSlice = useSelector((state) => state.horseSlice);
  const { horses, loading, error, success } = horseSlice;

  const horseTypes = ["عربي", "بلدي", "أجنبي"];
  const horsesSex = ["حصان", "بغل", "فرس"];
  const horsesColors = ["ابيض", "بني", "اسود"];

  useEffect(() => {
    const keyword = {
      color,
      sex,
      type,
    };
    dispatch(fetchHorses({ color, sex, type }));
  }, [color, sex, type]);
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  const handleFilter = () => {
    setColor("");
    setSex("");
    setType("");
  };
  return (
    <>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-row gap-3 mb-4 w-full">
          <select
            className="border rounded-lg px-3 py-1.5 text-lg w-full "
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>
              نوع الخيل
            </option>
            {horseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-1.5 text-lg   w-full"
            value={sex}
            onChange={(e) => setSex(e.target.value)}>
            <option value="" disabled>
              جنس الخيل
            </option>
            {horsesSex.map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-1.5 text-lg  w-full "
            value={color}
            onChange={(e) => setColor(e.target.value)}>
            <option value="" disabled>
              لون الخيل
            </option>
            {horsesColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className="">
            <button
              onClick={() => handleFilter()}
              className="bg-yellow-600 p-2 text-white w-24 rounded-md hover:scale-95 transition-all font-bold ">
              الكل
            </button>
          </div>
        </div>

        {/* عرض الخيول */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1   gap-3">
            {horses?.data?.map((horse) => (
              <div
                key={horse.id}
                className="border rounded-lg overflow-hidden bg-white hover:scale-95 transition-all duration-300 cursor-pointer">
                <div className="flex gap-2 p-2">
                  <img
                    src={`http://localhost:5000/uploads/${horse?.image}`}
                    alt={horse.name}
                    className="w-36 h-32 object-cover rounded"
                  />
                  <div className="flex-1 text-lg">
                    <h3 className="font-bold text-base mb-1">{horse.name}</h3>
                    <div className="space-y-1">
                      <div>
                        النوع:{" "}
                        <span className="text-gray-600">
                          {horse.type}, {horse.sex}
                        </span>
                      </div>
                      <div>
                        تاريخ الميلاد:{" "}
                        <span className="text-gray-600">
                          {new Date(horse?.age).toLocaleDateString("ar-En")}
                        </span>
                      </div>
                      <div>
                        اللون:{" "}
                        <span className="text-gray-600">{horse.color}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t px-2 py-1.5 bg-gray-50 text-md space-y-1">
                  <div className="grid grid-cols-2 gap-x-2">
                    <div>
                      النبض:{" "}
                      <span className="text-gray-600">{horse?.pulse}</span>
                    </div>
                    <div>
                      الحرارة:{" "}
                      <span className="text-gray-600">{horse?.heat}°C</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <div>
                      العين: <span className="text-gray-600">{horse?.eye}</span>
                    </div>
                    <div>
                      الدم:{" "}
                      <span className="text-gray-600">{horse?.blood}</span>
                    </div>
                  </div>
                  {horse.champions != "" && (
                    <div className="mt-1">
                      <div className="font-medium">البطولات:</div>
                      <div className="text-gray-600">{horse.champions}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SimpleHorsesListing;
