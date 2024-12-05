import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../component/features/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/slicers/authSlicer";
import Loader from "../../component/features/Loader";
const Register = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice);
  const { user, loading, error, success } = userSlice;

  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState("");

  // const validateForm = () => {
  //   if (!formData.name.trim()) return toast.error("من فضلك ادخل الاسم");
  //   if (formData.name.length < 3)
  //     return toast.error(" الاسم يجب الا يقل عن 3 احرف");
  //   if (!formData.email.trim()) return toast.error("من فضلك ادخل الايميل");
  //   if (!/\S+@\S+\.\S+/.test(formData.email))
  //     return toast.error("Invalid email format");
  //   if (!formData.password) return toast.error("من فضلك ادخل الرقم السري");
  //   if (formData.password.length < 6)
  //     return toast.error("الرقم السري يجب الا يقل عن 6 احرف او 6 ارقام");

  //   return true;
  // };
  const handleSubmit = () => {
    const user = { name, email, password };

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email && email.match(isValidEmail)) {
      dispatch(registerUser(user));
      notify();
      if (success) {
        navigator("/");
      }
    } else {
      setNotify(toast.error("من فضلك ادخل ايميل صحيح"));
    }
  };
  toast.options = {
    preventDuplicates: true,
    preventOpenDuplicates: true,
  };
  useEffect(() => {
    setNotify(toast.error(error));
  }, [error]);
  useEffect(() => {
    if (success) {
      navigator("/");
    }
  }, [success]);
  return (
    <div>
      <div className="">
        <div className="bg-[var(--dark-color)]">
          <Header />
        </div>
        {error && (
          <div>
            <span className="invisible">{notify}</span>
          </div>
        )}
        (
        <div className="login grid grid-cols-2 max-lg:grid-cols-1  justify-center items-center rounded-md">
          <div className="h-full">
            <img
              className="h-full"
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?semt=ais_hybrid"
              alt=""
            />
          </div>
          <div className=" bg-white p-10 shadow-lg h-full">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg mt-10">
                اضافة مستخدم جديد
              </h3>
            </div>
            <div className="grid sm:grid-cols-1 gap-2">
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الاسم
                </label>
                <input
                  type="text"
                  placeholder="الاسم"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الايميل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="الايميل"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الرقم السري
                </label>
                <input
                  type="password"
                  placeholder="الرقم السري"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all">
              {loading ? <Loader /> : "  اضافة حساب"}
            </button>
            <p className="flex justify-center mt-2">
              لديك حساب بالفعل
              <a
                href="/login"
                className="ml-2 mr-2 text-[var(--primary-color)]">
                تسجيل الدخول
              </a>
            </p>
          </div>
        </div>
        )
      </div>
    </div>
  );
};

export default Register;
