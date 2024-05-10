import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { host, setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";
import { AllUsersRoutes } from "../utils/API";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default function Chat() {
  const toastContainerStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const fetchAllUsers = async () => {
    try {
      if (!localStorage.getItem("chat-app-user")) {
        return navigate("/login");
      }
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (user.hasAvatarImage == false) {
        return navigate("/setAvatar");
      }
      const userId = user._id;
      const { data } = await axios.get(`${AllUsersRoutes}/${userId}`);
      if (data.status == false) {
        toast.error(data.msg, toastContainerStyle);
      }
      if (data.status == true) {
        setCurrentUser(data.currentUser);
        setContacts(data.allUsers);
      }
    } catch (error) {
      console.log(error, "fetchAllUser Errors");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            handleChatChange={handleChatChange}
          />
          {!currentChat ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              socket={socket}
              currentUser={currentUser}
              currentChat={currentChat}
            />
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
