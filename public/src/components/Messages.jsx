import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";
import { AllUsersRoutes } from "../utils/API";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const MessageContainer = styled.div`
  height: 80%;
  display: flex;
`;

export default function Messages() {
  return <MessageContainer></MessageContainer>;
}
