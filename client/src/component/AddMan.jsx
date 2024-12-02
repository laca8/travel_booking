import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { NavLink, useNavigate } from "react-router-dom";
import { addKnight, fetchKnight } from "../redux/slicers/knightSlicer";
import { toast } from "react-toastify";
import Loader from "./features/Loader";
import KnightDetails from "./KnightDetails";
const AddMan = () => {
  const navigator = useNavigate();

  const [notify, setNotify] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [file, setFile] = useState("");
  const [stable, setStable] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKnight());
  }, []);
  const knightSlice = useSelector((state) => state.knightSlice);
  const { knight, loading, error, success } = knightSlice;
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

    dispatch(addKnight(formData));
    if (success) {
      setNotify(toast.success("تم اضافة بيانات الفارس"));
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
      {knight == null || knight?.data == null ? (
        <div className="max-w-4xl mx-auto mt-10 font-[sans-serif] bg-white p-10 shadow-lg rounded-md">
          <div className="flex items-center justify-center mb-2">
            <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
              بيانات الفارس
            </h3>
          </div>
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
            onClick={() => handleSubmit()}>
            {loading ? <Loader /> : " حفظ"}
          </button>
        </div>
      ) : (
        <KnightDetails />
      )}
    </div>
  );
};

export default AddMan;
