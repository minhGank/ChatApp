import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setProfilePicRoute } from "../utils/API";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      margin-bottom:2rem;
    }
  }

  .avatars {
    display: flex;
    gap: 1rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center
      transition: 0.5s ease-in-out;
       img {
        width: 6rem;
        cursor: pointer;
      }     
     
    }
    .selected {
        border: 0.4rem solid #4e0eff;
      }
  }




  .reset_fetching_avatar {
    cursor:pointer;
    background-color: white;
    padding:7px;
    border-radius:50%;
    margin-bottom:2rem
}
  .reset_fetching_avatar:hover {
    background-color:#fffe
  }

  .confirm-btn {
    margin-top: 10px;
      padding: 12px 30px;
      margin-bottom: 5px;
      background-color: #997af0;
      color: white;
      border-radius: 6px;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
    }
    .confirm-btn:hover {
      background-color: #999af7;
      cursor: pointer;
    }
    .linkTo:hover {
      color: purple;
    }
    .linkTo {
      color: white;
    }
  
`;

export default function SetAvatar() {
  const navigate = useNavigate();
  const avatarApi = "https://api.multiavatar.com/45678945";
  const toastContainerStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });

  const [avatarData, setAvatarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);

  const setProfilePicture = async () => {
    if (selectedAvatar < 0) {
      return toast.error("No avatar selected", toastContainerStyle);
    }
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    const username = user.username;

    const { data } = await axios.post(`${setProfilePicRoute}/${username}`, {
      img: avatarData[selectedAvatar],
    });

    if (data.status == false) {
      return toast.error(data.msg, toastContainerStyle);
    }
    if (data.status == true) {
      user.hasAvatarImage = true;
      user.avatar = avatarData[selectedAvatar];
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      return toast.success(data.msg, toastContainerStyle);
    }
  };

  const fetchAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${avatarApi}/${Math.round(
          Math.random() * 1000 * Math.random() * 1000
        )}?apikey=sor6bu8acHpj4O
        `
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatarData(data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar for your profile picture</h1>
        </div>
        <div className="avatars">
          {avatarData.map((a, i) => {
            return (
              <div
                key={i}
                className={`avatar ${selectedAvatar == i ? "selected" : ""}`}
              >
                <img
                  onClick={() => {
                    setSelectedAvatar((prev) => i);
                    console.log(selectedAvatar);
                  }}
                  src={`data:image/svg+xml;base64,${a}`}
                />
              </div>
            );
          })}
        </div>
        <button
          className="reset_fetching_avatar"
          onClick={() => {
            setSelectedAvatar("");
            fetchAvatar();
          }}
        >
          reset
        </button>

        <button
          onClick={() => {
            setProfilePicture();
          }}
          className="confirm-btn"
        >
          Set Profile Picture
        </button>
        <Link to="/" className="linkTo">
          Home
        </Link>
      </Container>
      <ToastContainer />
    </>
  );
}
