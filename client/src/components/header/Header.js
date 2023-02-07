import React from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/userAction";
const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "#",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];
const Header = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigator("/login");
  };
  return (
    <header className="header">
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="navigation">
            <ul className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, i) => (
                <li className="nav__item" key={i}>
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center gap-4">
              {userInfo?.user?.name ? (
                <>
                  <Button className="btn" outline>
                    {userInfo?.user?.name}
                  </Button>
                  <Button className="btn primary__btn" onClick={logoutHandler}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
