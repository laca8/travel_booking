import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { removeHorse } from "../../redux/slicers/horseSlicer";
import { toast } from "react-toastify";
import Loader from "../features/Loader";
import {
  Trophy,
  Calendar,
  Medal,
  Star,
  MapPin,
  CalendarFold,
  Phone,
  UsersRound,
} from "lucide-react";
import EditHorse from "./EditHorse";
import AddHorse from "./AddHorse";
import { fetchKnight } from "../../redux/slicers/knightSlicer";
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-2 rounded">
      <span className="  text-[var(--primary-color)] block font-bold">
        {label}
      </span>
      <span className=" font-semibold text-gray-800">{value}</span>
    </div>
  );
}
const HorseDetails = () => {
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const horseSlice = useSelector((state) => state.horseSlice);
  const { horses, loading, error, success } = horseSlice;

  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  const handleDelete = (id) => {
    dispatch(removeHorse(id));
    setNotify(toast.success("تم حذف بيانات الخيل"));
  };
  //   const handleEdit = () => {
  //     setIsOpen(!isOpen);
  //   };

  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  return (
    <div>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      {error && (
        <div>
          <span className="invisible">{notify}</span>
        </div>
      )}
      {loading && <Loader />}

      {loading && <Loader />}
      <AddHorse isOpen={isOpen} setIsOpen={setIsOpen} />
      {horses?.data?.length != 0 &&
        horses?.data?.map((x, i) => (
          <div
            className="horse rounded-lg shadow-lg overflow-hidden text-lg"
            key={i}>
            <div className="p-4 bg-gray-50 ">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleDelete(x._id)}
                  className=" px-6 py-2.5   bg-[var(--danger)] text-white rounded hover:bg-red-600 transition-all ">
                  {loading ? <Loader /> : "حذف"}
                </button>

                <div className="p-6 text-lg ">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    بروفايل الخيل
                  </h2>

                  <div className="flex flex-col md:flex-row">
                    <div className=" space-y-4">
                      <img
                        src={`http://localhost:5000/uploads/${x?.image}`}
                        alt="صورة الحصان"
                        className="rounded-md w-40 h-36 object-cover shadow-md mx-auto ml-2"
                      />
                      <div className="bg-blue-50 rounded-lg p-3 shadow-sm ml-2">
                        <h3 className="font-semibold  mb-2 text-blue-800">
                          البطولات:
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-blue-100 text-blue-800  px-2 py-1 rounded-full">
                            {x.champions}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-3/4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <InfoItem label="اسم الخيل" value={x?.name} />
                        <InfoItem label="لون الخيل" value={x?.color} />
                        <InfoItem label="نوع الخيل" value={x?.type} />
                        <InfoItem label="جنس الخيل" value={x?.sex} />
                        <InfoItem label="عمر الخيل" value={x?.age} />
                        <InfoItem label="ship number" value={x?.ship_num} />
                        <InfoItem label="اسم المالك" value={x?.horse_owner} />
                        <InfoItem label="اسم الاسطبل" value={x?.stable} />
                        <InfoItem
                          label="حالة البيع"
                          value={x?.buying ? "للبيع" : "ليس للبيع"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      حالة الخيل
                    </h3>
                    <div className="bg-[--primary-color] rounded-lg p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <InfoItem label="النبض" value={x?.pulse} />
                        <InfoItem label="الحرارة" value={x?.heat} />
                        <InfoItem label="حالة العين" value={x?.eye} />
                        <InfoItem label="حالة الدم" value={x?.blood} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HorseDetails;
