import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute, registerRoute } from "../utils/API";

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 100px;
      margin-bottom: 20px;
    }
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 50%;
    input {
      padding: 20px;
      padding-right: 100px;
      margin-top: 3px;
      margin-bottom: 3px;
      border-radius: 7px;
      border: 0.1rem solid #4e0eff;
    }
    input:focus {
      outline: none;
      border: 0.1rem solid #997af0;
    }
    button {
      margin-top: 20px;
      padding: 12px 30px;
      margin-bottom: 10px;
      background-color: #997af0;
      color: white;
      border-radius: 6px;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
    }
    button:hover {
      background-color: #999af7;
      cursor: pointer;
    }
    .linkTo:hover {
      color: purple;
    }
    .linkTo {
      color: white;
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const toastContainerStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const checkLocalStorage = () => {
    const user = localStorage.getItem("chat-app-user");
    if (user) {
      navigate("/");
    }
  };

  useEffect(checkLocalStorage, []);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleValidation = () => {
    const { password, email } = loginInfo;

    if (email.length == 0) {
      toast.error("Please fill in email address", toastContainerStyle);
      return false;
    } else if (password.length == 0) {
      toast.error("Please fill in the password", toastContainerStyle);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { password, email } = loginInfo;
        const { data } = await axios.post(loginRoute, {
          email: email,
          password: password,
        });
        if (data.status === false) {
          return toast.error(data.msg, toastContainerStyle);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.newUser));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(e) => {
            return handleSubmit(e);
          }}
        >
          <div className="brand">
            <img src="" />
            <h1>Chat App</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <button type="submit">Log in</button>
          <Link className="linkTo" to="/register">
            Don't Have Account
          </Link>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
