import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../assets/images/background/17.png";

export default function SignIn() {
  let { loginUser, customalert } = useContext(AuthContext);
  let [type, setType] = useState("password");
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <section
        className="page-title"
        style={{ backgroundImage: "url(images/background/17.png)" }}
      >
        <div className="auto-container">
          <h1>login</h1>
        </div>
      </section>
      <div className="login-container margin">
        <div
          className="top-layer"
          style={{ backgroundImage: "url(images/background/20.png)" }}
        ></div>
        <div
          className="bottom-layer"
          style={{ backgroundImage: "url(images/background/21.png)" }}
        ></div>
        <div className="auto-container">
          <div className="inner-container">
            <div className="image">
              <img src="images/resource/login.jpg" alt="" />
              <div className="login-form">
                <div
                  className="pattern-layer"
                  style={{ backgroundImage: "url(images/background/18.png)" }}
                ></div>
                <div
                  className="pattern-layer-2"
                  style={{ backgroundImage: "url(images/background/19.png)" }}
                ></div>
                <form onSubmit={loginUser}>
                  {customalert}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="form-group position-relative d-flex">
                    <input
                      id="pass"
                      type={type}
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <IconButton
                      classNameName="eye-button"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>

                  <div className="form-group">
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      name="submit-form"
                    >
                      <span className="txt">Login</span>
                    </button>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
