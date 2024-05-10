import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";
import { BiPowerOff } from "react-icons/bi";

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  padding: 0.5rem;
  border: none;
  span {
    font-size: 1rem;
    margin-top: 2px;
  }
  svg {
    font-size: 1.3rem;
  }
  color: white;
`;

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button
      onClick={() => {
        handleLogout();
      }}
    >
      <span>Log Out</span>
      <BiPowerOff />
    </Button>
  );
}
