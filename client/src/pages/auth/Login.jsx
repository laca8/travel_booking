import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../component/features/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/slicers/authSlicer";
import Loader from "../../component/features/Loader";
const Login = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice);
  const { user, loading, error, success } = userSlice;

  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState("");

  const handleSubmit = () => {
    const user = { email, password };
    dispatch(loginUser(user));
    notify();
    if (success) {
      navigator("/");
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
        <div className="login grid grid-cols-2 mt-4 justify-center max-lg:grid-cols-1">
          <div className="h-full">
            <img
              className="h-full"
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?semt=ais_hybrid"
              alt=""
            />
          </div>

          <div className="bg-white p-10 shadow-lg">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-[var(--primary-color)] text-xl font-bold border-2 border-[var(--primary-color)] p-2 rounded-lg mt-10">
                تسجيل الدخول
              </h3>
            </div>
            <div className="grid sm:grid-cols-1 gap-2">
              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الايميل
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="الايميل"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)]  focus:border-[var(--dark-color)] rounded  "
                />
              </div>

              <div className="items-center">
                <label className="text-[18px] text-[var(--dark-color)] font-bold">
                  الرقم السري
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="الرقم السري"
                  className="p-2 bg-[var(--white-color)] text-black w-full text-sm border-2 border-[var(--dark-color)] focus:border-[var(--dark-color)] rounded "
                />
              </div>
            </div>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="mt-8 px-6 py-2.5 w-full text-sm bg-[var(--primary-color)] text-white rounded hover:bg-blue-600 transition-all">
              {loading ? <Loader /> : "  تسجيل الدخول"}
            </button>
            <p className="flex justify-center mt-2">
              ليس لديك حساب
              <a
                href="/register"
                className="ml-2 mr-2 text-[var(--primary-color)]">
                اضافة حساب جديد
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
