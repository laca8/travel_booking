import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

const Header = () => {
  const navigator = useNavigate();
  const user = localStorage.getItem("user");
  // console.log(JSON.parse(user)?.data?.isAdmin);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigator("/login");
  };
  return (
    <header className="flex py-2 px-2 sm:px-10  font-[sans-serif] min-h-[60px] tracking-wide relative z-50 ">
      <div className="flex flex-wrap items-center justify-between  w-full max-lg:justify-between ">
        <div className="flex  items-center gap-4">
          <a href="javascript:void(0)">
            <img
              onClick={() => navigator("/")}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe2oI4DeMonhpG4-7IbcqfAj4IqxNwFL24qA&s"
              alt="logo"
              className="w-14 rounded-xl"
            />
          </a>

          <div
            id="collapseMenu"
            className="block max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
            <ul className="flex   max-sm:block">
              {user && user ? (
                <>
                  <li className=" border-gray-300 px-3">
                    <NavLink
                      to="/"
                      activeClassName="active"
                      className="text-white block font-semibold text-[15px]">
                      الصفحة الرئيسية
                    </NavLink>
                  </li>
                  <li className=" border-[var(--dark-color)]  px-3 text-white block font-semibold text-[15px]">
                    <Dropdown
                      label="اضافة"
                      dismissOnClick={false}
                      inline
                      className="bg-[var(--dark-color)]">
                      <Dropdown.Item
                        onClick={() => navigator("/add-man")}
                        className="text-white hover:text-[--primary-color]">
                        فارس
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigator("/add-club")}
                        className="text-white hover:text-[--primary-color]">
                        نادي
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigator("/add-horse")}
                        className="text-white hover:text-[--primary-color]">
                        خيل
                      </Dropdown.Item>
                    </Dropdown>
                  </li>
                  {JSON.parse(user)?.data?.isAdmin ? (
                    <li className=" border-[var(--dark-color)]  px-3 text-white block font-semibold text-[15px]">
                      <Dropdown
                        label="اضافة"
                        dismissOnClick={false}
                        inline
                        className="bg-[var(--dark-color)]">
                        <Dropdown.Item>
                          <NavLink
                            to="/add-train"
                            activeClassName="active"
                            className="text-white block font-semibold text-[15px] hover:text-[--primary-color]">
                            التدريب
                          </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <NavLink
                            to="/champ"
                            activeClassName="active"
                            className="text-white block font-semibold text-[15px] hover:text-[--primary-color]">
                            المسابقة
                          </NavLink>
                        </Dropdown.Item>
                      </Dropdown>
                    </li>
                  ) : null}

                  <li className=" border-gray-300  px-3">
                    <NavLink
                      to="/trains"
                      activeClassName="active"
                      className="text-white block font-semibold text-[15px]">
                      التدريبات
                    </NavLink>
                  </li>
                  <li className=" border-gray-300  px-3">
                    <NavLink
                      to="/races-details"
                      activeClassName="active"
                      className="text-white block font-semibold text-[15px]">
                      المسابقات
                    </NavLink>
                  </li>
                  <li className=" border-gray-300  px-3">
                    <NavLink
                      to="/notes"
                      activeClassName="active"
                      className="text-white block font-semibold text-[15px]">
                      المتابعات
                    </NavLink>
                  </li>
                </>
              ) : null}
              <li className=" border-gray-300  px-3">
                <NavLink
                  to="/contact"
                  activeClassName="active"
                  className="text-white block font-semibold text-[15px]">
                  تواصل معنا
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex  space-x-3">
          {user ? (
            <button
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[var(--danger)] bg-[var(--danger)] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[var(--white-color)]"
              onClick={() => handleLogout()}>
              تسجيل خروج
            </button>
          ) : (
            <button
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[var(--primary-color)] bg-[var(--primary-color)] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[var(--primary-color)]"
              onClick={() => navigator("/login")}>
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
