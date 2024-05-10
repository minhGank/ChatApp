import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";

const ContactContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rems;
      }
    }
  }
`;

export default function Contact({ contacts, currentUser, handleChatChange }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();
  useEffect(() => {
    if (currentUser) {
      console.log("this is current User", currentUser);
      setCurrentUserImage(currentUser?.avatar);
      setCurrentUserName(currentUser?.username);
    } else {
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  return (
    <>
      {currentUser && (
        <ContactContainer>
          <div className="brand">
            <h1>Chat App</h1>
          </div>

          {/* the contacts section start here */}
          <div className="contacts">
            {contacts.map((contact, i) => {
              return (
                <div
                  className={`contact ${
                    i == currentSelected ? "selected" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    changeCurrentChat(i, contact);
                  }}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact?.avatar}`} />
                  </div>
                  <div className="username">
                    <h3>{contact?.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* the user section start here */}
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </ContactContainer>
      )}
    </>
  );
}
