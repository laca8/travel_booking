import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, FormGroup, Form, Row } from "reactstrap";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/features/Error";
import Loader from "../components/features/Loader";
import { login } from "../redux/action/userAction";
import "../styles/login.css";
const Login = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigator("/");
    }
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} />
                </div>
                <h2>Login</h2>
                <Form onSubmit={submitHandler}>
                  {error && <Error error={error} />}
                  {loading && <Loader />}
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don`t have an account..? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
