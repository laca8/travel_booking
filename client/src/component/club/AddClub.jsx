import React, { useState, useEffect } from "react";
import Header from "../features/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addClub, fetchClub } from "../../redux/slicers/clubSlicer";
import ClubDetails from "./ClubDetails";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
const AddClub = () => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState("");
  const [name, setName] = useState("");
  const [club_owner, setOwner] = useState("");
  const [manager, setManager] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    dispatch(fetchClub());
  }, []);
  const clubSlice = useSelector((state) => state.clubSlice);
  const { club, loading, error, success } = clubSlice;
  const navigator = useNavigate();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("club_owner", club_owner);
    formData.append("manager", manager);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("address", address);

    dispatch(addClub(formData));
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
      {club == null || club.data == null ? (
        <div className="max-w-4xl mx-auto font-[sans-serif]  bg-white p-10 shadow-lg mt-10 rounded-md">
          <div className="flex items-center justify-center mb-2">
            <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg">
              بيانات النادي
            </h3>
          </div>
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
                maxLength={11}
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
            onClick={() => handleSubmit()}>
            {loading ? <Loader /> : "حفظ"}
          </button>
        </div>
      ) : (
        <ClubDetails />
      )}
    </div>
  );
};

export default AddClub;
