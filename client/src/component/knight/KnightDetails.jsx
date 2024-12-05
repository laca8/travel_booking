import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import {
  fetchKnight,
  removeKnight,
  editKnight,
} from "../../redux/slicers/knightSlicer";
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
import EditKnight from "./EditKnight";
const KnightDetails = () => {
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const knightSlice = useSelector((state) => state.knightSlice);
  const { knight, loading, error, success } = knightSlice;
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  const handleDelete = () => {
    dispatch(removeKnight());
    setNotify(toast.success("تم حذف بيانات الفارس"));
  };
  //   const handleEdit = () => {
  //     setIsOpen(!isOpen);
  //   };

  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  return (
    <div>
      {error && (
        <div>
          <span className="invisible">{notify}</span>
        </div>
      )}
      {loading && <Loader />}
      <div className="min-h-screen  py-8 text-lg">
        <div className="max-w-4xl  mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className=" flex flex-row items-start justify-start w-72  mr-2">
            <button
              type="button"
              onClick={() => handleDelete()}
              className="mt-8 px-6 py-2.5  text-sm bg-[var(--danger)] text-white rounded hover:bg-red-600 transition-all">
              {loading ? <Loader /> : "حذف"}
            </button>
            <EditKnight isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          {/* Header Section */}
          <div className="relative h-28 bg-[var(--primary-color)]">
            <div className="absolute -bottom-16 left-8">
              <img
                src={`/uploads/${knight?.data?.image}`}
                alt="صورة الفارس"
                className="w-32 h-32 rounded-full border-4 border-var[--primary-color]"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className=" px-8 bg-white">
            <h1 className="text-3xl font-bold text-gray-900">
              {knight?.data?.name}
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <MapPin className="w-4 h-4 ml-2" />
              {knight?.data?.address}
            </p>

            {/* Contact Info */}
            <div className="mt-4 flex gap-4">
              <span className="flex items-center text-gray-600">
                <CalendarFold className="w-4 h-4 ml-2" />
                {knight?.data?.age}
              </span>
              <span className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 ml-2" />
                {knight?.data?.phone}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
              <div className="bg-yellow-700 text-white p-4 rounded-lg mb-2">
                <div className="flex items-center mb-2">
                  <UsersRound className="w-5 h-5 text-yellow-500 ml-2" />
                  <h3 className="font-semibold">النوع</h3>
                </div>
                <p className="text-2xl font-bold">{knight?.data?.sex}</p>
              </div>

              <div className="bg-yellow-700 text-white mb-2 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-blue-500 ml-2" />
                  <h3 className="font-semibold">الاسطبل</h3>
                </div>
                <p className="text-2xl font-bold">{knight?.data?.stable}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnightDetails;
