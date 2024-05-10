import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";

const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  span {
    color: #4e00ff;
  }
`;

export default function Welcome({ currentUser }) {
  return (
    <WelcomeContainer>
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </WelcomeContainer>
  );
}
