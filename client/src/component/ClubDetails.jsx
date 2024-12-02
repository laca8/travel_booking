import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeIcon,
  UserIcon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeClub } from "../redux/slicers/clubSlicer";
import { toast } from "react-toastify";
import Loader from "./features/Loader";
import EditClub from "./EditClub";
const ClubDetails = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [notify, setNotify] = useState("");
  const clubSlice = useSelector((state) => state.clubSlice);
  const { club, loading, error, success } = clubSlice;
  const handleDelete = () => {
    dispatch(removeClub());
    setNotify(toast.success("تم حذف بيانات النادي"));
  };
  return (
    <div className="min-h-screen  p-8 font-sans" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-lg shadow-lg">
        <div className=" flex flex-row items-start justify-start w-72  mr-2">
          <button
            type="button"
            onClick={() => handleDelete()}
            className="mt-8 px-6 py-2.5  text-sm bg-[var(--danger)] text-white rounded hover:bg-red-600 transition-all">
            {loading ? <Loader /> : "حذف"}
          </button>
          <EditClub isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="relative  overflow-hidden rounded-t-lg">
          <div className="   bg-[var(--primary-color)] to-transparent p-6">
            <h1 className="text-4xl font-bold text-white">
              {club?.data?.name}
            </h1>
          </div>
        </div>

        <div className="p-6 bg-gray-100">
          <div className="mb-6 grid gap-4 text-gray-600 sm:grid-cols-2">
            <div className="flex items-center">
              <UserIcon className="ml-2 h-5 w-5 text-blue-500" />
              <span className="font-semibold">مالك النادي:</span>
              <span className="mr-2">{club?.data?.club_owner}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="ml-2 h-5 w-5 text-green-500" />
              <span className="font-semibold">مدير النادي:</span>
              <span className="mr-2">{club?.data?.manager}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="ml-2 h-5 w-5 text-red-500" />
              <span className="font-semibold">العنوان:</span>
              <span className="mr-2">{club?.data?.address}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="ml-2 h-5 w-5 text-yellow-500" />
              <span className="font-semibold">رقم الهاتف:</span>
              <span className="mr-2" dir="ltr">
                {club?.data?.phone}
              </span>
            </div>
            <div className="flex items-center sm:col-span-2">
              <GlobeIcon className="ml-2 h-5 w-5 text-purple-500" />
              <span className="font-semibold">الموقع الإلكتروني:</span>
              <a
                href={`https://${club?.data?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 text-blue-600 hover:underline">
                {club?.data?.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
