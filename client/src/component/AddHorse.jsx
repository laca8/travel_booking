import React, { useState, useEffect } from "react";
import Header from "./Header";
import { addHorse, fetchHorse } from "../redux/slicers/horseSlicer";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { toast } from "react-toastify";
import Loader from "./features/Loader";
import { useDispatch, useSelector } from "react-redux";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="container fixed  inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full  bg-white rounded-lg shadow-xl">
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
const AddHorse = ({ isOpen, setIsOpen }) => {
  const navigator = useNavigate();

  const [notify, setNotify] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState("");
  const [stable, setStable] = useState("");
  const [type, setType] = useState("");
  const [ship_num, setShip] = useState("");
  const [champions, setChamp] = useState("");
  const [horse_owner, setOwner] = useState("");
  const [buying, setBuying] = useState(false);
  const [pulse, setPulse] = useState("");
  const [eye, setEye] = useState("");
  const [heat, setHeat] = useState("");
  const [blood, setBlood] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHorse());
  }, []);
  const horseSlice = useSelector((state) => state.horseSlice);
  const { horse, loading, error, success } = horseSlice;
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
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("stable", stable);
    formData.append("sex", sex);
    formData.append("color", color);
    formData.append("type", type);
    formData.append("ship_num", ship_num);
    formData.append("horse_owner", horse_owner);
    formData.append("champions", champions);
    formData.append("buying", buying);
    formData.append("pulse", pulse);
    formData.append("heat", heat);
    formData.append("eye", eye);
    formData.append("blood", blood);
    if (file) {
      formData.append("image", file);
    }
    console.log(buying);

    dispatch(addHorse(formData));
    dispatch(fetchHorse());
    setIsOpen(!isOpen);
  };
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  return (
    <div className="horse">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-3 w-52 text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all">
        {loading ? <Loader /> : "اضافة خيل "}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="بيانات الخيل">
        <div className=" relative grid grid-cols-3 gap-2 max-md:grid-cols-2 border-2 border-[var(--dark-color)] mb-2">
          <div className="col-span-2 grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1 mt-4 p-2 rounded-md">
            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                اسم الخيل
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="اسم الخيل"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                لون الخيل
              </label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                type="text"
                placeholder="لون الخيل"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                نوع الخيل
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="countries"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded ">
                <option selected value={""}>
                  اختر
                </option>
                <option value="بلدي">بلدي</option>
                <option value="عربي">عربي</option>
                <option value="أجنبي">أجنبي</option>
              </select>
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                جنس الخيل
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                id="countries"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded ">
                <option selected value={""}>
                  اختر
                </option>
                <option value="فرس">فرس</option>
                <option value="حصان">حصان</option>
                <option value="بغل">بغل</option>
              </select>
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                عمر الخيل
              </label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="date"
                placeholder="عمر الخيل"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--primary-color)] rounded "
              />
            </div>
            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                Ship Number
              </label>
              <input
                value={ship_num}
                onChange={(e) => setShip(e.target.value)}
                type="text"
                placeholder="ship number"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
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
                placeholder=""
                className="p-1 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>
            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                اسم المالك
              </label>
              <input
                value={horse_owner}
                onChange={(e) => setOwner(e.target.value)}
                type="text"
                placeholder="اسم المالك"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                اسم الأسطبل أو النادي
              </label>
              <input
                value={stable}
                onChange={(e) => setStable(e.target.value)}
                type="text"
                placeholder="اسم الأسطبل أو النادي"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>

            <div className="items-center">
              <label className="text-[18px] text-[var(--dark-color)] font-bold">
                بطولات
              </label>
              <input
                value={champions}
                onChange={(e) => setChamp(e.target.value)}
                type="text"
                placeholder="بطولات"
                className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
              />
            </div>
            <div className=" flex items-center justify-center bottom-2 mt-4 max-md:left-10 ">
              <input
                value={buying}
                onChange={() => setBuying(!buying)}
                id="link-checkbox"
                type="checkbox"
                className=" w-4  text-blue-600  "
              />
              <label className=" text-2xl font-medium text-[var(--dark-color)]">
                للبيع
              </label>
            </div>
          </div>
          <div className="border-2 border-[var(--secondary-color)] ml-2 max-md:col-span-3 max-sm:col-span-3 p-2  mt-2 mb-2 rounded-md max-lg:w-full max-md:ml-2 max-md:mr-2 max-md:mb-12 ">
            <div className="flex  justify-center mb-2">
              <h3 className="text-[var(--primary-color)] text-xl font-bold rounded-lg">
                حالة الخيل
              </h3>
            </div>
            <div className="grid grid-cols-1 p-2 max-md:w-full">
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  النبض
                </label>
                <input
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  type="text"
                  placeholder="النبض"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  العين
                </label>
                <input
                  value={eye}
                  onChange={(e) => setEye(e.target.value)}
                  type="text"
                  placeholder="العين"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الدم
                </label>
                <input
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  type="text"
                  placeholder="الدم"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الحرارة
                </label>
                <input
                  value={heat}
                  onChange={(e) => setHeat(e.target.value)}
                  type="text"
                  placeholder="الحرارة"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all">
          حفظ
        </button>
      </Modal>
    </div>
  );
};

export default AddHorse;
