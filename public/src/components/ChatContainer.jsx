import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { addMsgRoute, getAllMsgRoute } from "../utils/API";
const ChatContainerDiv = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 12% 73% 15%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user_details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .receiver {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
    .start_a_conversation_div {
      display: flex;
      align-items: center;
      justify-content: center;
      .start_a_conversation_div_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        h3 {
          font-size: 30px;
          color: white;
        }
        p {
          font-size: 15px;
          color: white;
        }
        span {
          font-size: 15px;
          color: #9a86f3;
        }
      }
    }
  }
`;

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [conversation, setConversation] = useState("");
  const [arrivialMessage, setArrivialMessage] = useState();
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [conversation]);
  useEffect(() => {
    socket.current.on("msg-receive", (data) => {
      console.log("render");

      setArrivialMessage({ fromSelf: false, message: data });

      return socket.current.off("receive");
    });
  }, []);

  useEffect(() => {
    arrivialMessage &&
      setConversation((prev) => {
        return [...prev, arrivialMessage];
      });
  }, [arrivialMessage]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axios.post(getAllMsgRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        console.log(data);
        setConversation(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      const from = currentUser._id;
      const to = currentChat._id;

      const message = msg;
      const { data } = await axios.post(addMsgRoute, {
        from,
        to,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChat._id,
        msg: message,
      });
      setConversation((prevConversation) => [
        ...prevConversation,
        { fromSelf: true, message: message },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContainerDiv>
      <div className="chat-header">
        <div className="user_details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat?.avatar}`} />
          </div>

          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      <div className="chat-message">
        {Array.isArray(conversation) && conversation.length > 0 ? (
          conversation.map((msg) => {
            return (
              <div ref={scrollRef}>
                <div
                  className={`message ${msg?.fromSelf ? "sender" : "receiver"}`}
                >
                  <div className="content">
                    <p>{msg?.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="start_a_conversation_div">
              <div className="start_a_conversation_div_content">
                <h3>Let's Start The Conversation</h3>
                <p>
                  Please follow <span>the policy of Chat App</span> ,{" "}
                  <span>respect others</span> and
                  <span> create wonderful time together.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </ChatContainerDiv>
  );
}
