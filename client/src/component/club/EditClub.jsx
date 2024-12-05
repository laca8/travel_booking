import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";

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
import { editClub } from "../../redux/slicers/clubSlicer";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const EditClub = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState("");
  const [name, setName] = useState("");
  const [club_owner, setOwner] = useState("");
  const [manager, setManager] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const clubSlice = useSelector((state) => state.clubSlice);
  const { club, loading, error, success } = clubSlice;
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("clun_owner", club_owner);
    formData.append("manager", manager);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("address", address);

    dispatch(editClub(formData));
    if (success) {
      setNotify(toast.success("تم تحديث بيانات النادي"));
    }
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  useEffect(() => {
    if (club) {
      setName(club?.data?.name);
      setManager(club?.data?.manager);
      setPhone(club?.data?.phone);
      setOwner(club?.data?.club_owner);
      setAddress(club?.data?.address);
      setWebsite(club?.data?.website);
    }
  }, [club]);

  return (
    <div>
      <div className="p-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-2.5 w-full text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-all">
          {loading ? <Loader /> : "تعديل "}
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="بيانات النادي">
          <div className="grid sm:grid-cols-3 gap-2">
            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                اسم النادي
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="اسم النادي"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                مالك النادي
              </label>
              <input
                value={club_owner}
                onChange={(e) => setOwner(e.target.value)}
                type="text"
                placeholder="مالك النادي"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                اسم المدير
              </label>
              <input
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                type="text"
                placeholder="اسم المدير"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                عنوان النادي
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="عنوان النادي"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                رقم التليفون
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="رقم التليفون"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                موقع خاص بالنادي
              </label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                type="text"
                placeholder="موقع خاص بالنادي"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all"
            onClick={() => handleUpdate()}>
            {loading ? <Loader /> : "تحديث"}
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default EditClub;
