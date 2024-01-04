import React, { useContext, useEffect, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { BsSend } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { ImAttachment } from "react-icons/im";
import { IoVideocamOutline } from "react-icons/io5";
import "./UserChat.css";
import { BsEmojiSmile } from "react-icons/bs";
import { MyContext } from "./Home";
import { FaBars } from "react-icons/fa";

const UserChat = ({ users, handleNav }) => {
  const data = useContext(MyContext);
  const [us, setUs] = useState(data[0] || []);
  const [oo, setOO] = useState(us.chats);
  const [input, setInput] = useState("");
  const [add, setAdd] = useState([]);
  const [toggle, setToggle] = useState(false);

  const {
    name,
    onlineStatus,
    attachments = [],
    media = [],
    time,
    profileImage,
    id,
    chats: combinedChats,
  } = users || { chats: oo };

  function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.querySelector(".attach").style.marginRight = "300px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".attach").style.marginRight = "0";
  }

  const handleDot = () => {
    if (toggle === false) {
      openNav();
      setToggle(true);
    } else {
      closeNav();
      setToggle(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput("");
  };

  return (
    <div className="contain">
      <div className="nav">
        <div className="profileName">
          <span className="dotDiv">
            <FaBars className="dot" onClick={handleNav} />{" "}
          </span>
          <div className="img">
            <img src={profileImage || us.profileImage} alt="" />
            <p className={`${us.onlineStatus} ${onlineStatus}`}></p>
          </div>
          <div className="name">
            <p>{name || us.name}</p>
            <p className="stata">{onlineStatus || us.onlineStatus}</p>
          </div>
        </div>
        <div className="others">
          <button>
            <IoCallOutline />
          </button>
          <button>
            <IoVideocamOutline />
          </button>
          <button>
            <HiDotsVertical onClick={handleDot} />
          </button>
        </div>
      </div>
      <div className="chat">
        <div className="chatBox">
          {combinedChats &&
            combinedChats.map((data, ind) => {
              return (
                <div className="line" key={ind}>
                  <img src={profileImage || us.profileImage} alt="" />

                  <div className="nam">
                    <span>{name || us.name},</span>{" "}
                    <span>{time || us.time}</span>
                    <p>{data}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div id="mySidenav" className="sidenav">
          <div className="media">
            <p>Media({media.length || us.media.length})</p>
            <img src={media || us.media} alt="" />
          </div>
          <div className="attach">
            <h6>Attachments ({attachments.length || us.attachments.length})</h6>

            {attachments &&
              attachments.map((item, ind) => {
                return (
                  <div className="atta" key={ind}>
                    <div className="ico">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="info">
                      <p>{item.name}</p>
                      <p className="info-size">{item.size}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="chatting">
          <div className="emoji">
            <button onClick={() => console.log("emo")}>
              <BsEmojiSmile />
            </button>
          </div>
          <div className="in">
            <input
              type="text"
              placeholder="Type a Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="attach1">
            <button disabled={input === ""}>
              <BsSend className="send" type="submit" />
            </button>

            <button>
              <CiImageOn className="gallery" />
            </button>

            <button>
              <ImAttachment className="attachment" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserChat;
