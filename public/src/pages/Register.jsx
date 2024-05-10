import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/API";

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
    ${"" /* gap: 1rem; */}
    ${
      "" /* img {
      width: 5rem;
    } */
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 70px;
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
      margin-top: 14px;
      padding: 12px 30px;
      margin-bottom: 6px;
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

export default function Register() {
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

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = () => {
    const { password, username, email } = signUpInfo;
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      toast.error(
        "Password and confirm password not match",
        toastContainerStyle
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username must have at least 3 characters",
        toastContainerStyle
      );
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Password must have at least 6 characters",
        toastContainerStyle
      );
      return false;
    } else if (!email) {
      toast.error("Email can't be emty", toastContainerStyle);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { password, username, email } = signUpInfo;
        const { data } = await axios.post(registerRoute, {
          email: email,
          username: username,
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
            type="text"
            placeholder="Username"
            name="username"
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit">Create User</button>
          <Link className="linkTo" to="/login">
            already have an account
          </Link>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
