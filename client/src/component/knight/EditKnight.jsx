import { X } from "lucide-react";
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

const EditKnight = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [file, setFile] = useState("");
  const [stable, setStable] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notify, setNotify] = useState("");
  const knightSlice = useSelector((state) => state.knightSlice);
  const { knight, loading, error, success } = knightSlice;
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  const handleChange2 = (e) => {
    const x = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "images/jpg"];
    const maxSize = 1 * 1024 * 1024; // 5MB in bytes
    if (!x) return;

    // Validate file type
    if (!allowedTypes.includes(x.type)) {
      alert("Invalid file type. Please upload a JPEG, PNG, JPG.");
      return;
    }

    // Validate file size
    if (x.size > maxSize) {
      alert("File is too large. Maximum size is 1MB.");
      return;
    }
    setFile(e.target.files[0]);
  };
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sex", sex);
    formData.append("age", age);
    formData.append("phone", phone);
    formData.append("stable", stable);
    formData.append("address", address);
    if (file) {
      formData.append("image", file);
    }

    console.log(file);
    console.log(formData);

    dispatch(editKnight(formData));
    if (success) {
      setNotify(toast.success("تم تحديث بيانات الفارس"));
    }
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  useEffect(() => {
    if (knight) {
      setName(knight?.data?.name);
      setAge(knight?.data?.age);
      setPhone(knight?.data?.phone);
      setSex(knight?.data?.sex);
      setAddress(knight?.data?.address);
      setStable(knight?.data?.stable);
      setFile(knight?.data?.image);
    }
  }, [knight]);

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
          title="بيانات الفارس">
          <div className="">
            <div className=" mx-auto mt-10 font-[sans-serif] bg-white p-10 shadow-lg rounded-md">
              <div className="grid sm:grid-cols-3 gap-2">
                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    اسم الفارس
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="اسم الفارس"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
                  />
                </div>

                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    تاريخ الميلاد
                  </label>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="date"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  />
                </div>

                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    اسم الاسطبل
                  </label>
                  <input
                    value={stable}
                    onChange={(e) => setStable(e.target.value)}
                    type="text"
                    placeholder="اسم الاسطبل"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  />
                </div>

                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    النوع
                  </label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    id="countries"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded ">
                    <option selected>اختر</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>

                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    رقم التليفون
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxlength={11}
                    type="text"
                    placeholder="رقم التليفون"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  />
                </div>
                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    العنوان
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="العنوان"
                    className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  />
                </div>

                <div className="items-center">
                  <label className="text-[18px] text-[var(--dark-color)] font-bold">
                    الصورة
                  </label>
                  <input
                    onChange={handleChange2}
                    id="customFile"
                    accept="image/*"
                    type="file"
                    className="p-1 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all"
                onClick={() => handleUpdate()}>
                {loading ? <Loader /> : " تحديث"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EditKnight;
