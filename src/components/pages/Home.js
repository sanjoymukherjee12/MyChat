import React, { createContext, useEffect, useState } from "react";
import myImg from "../../images/my.jpg";
import "./Home.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import datas from "../data/User.json";
import UserChat from "./UserChat";

export const MyContext = createContext("");

const Home = () => {
  const [users, setUsers] = useState(datas.users);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState();
  const [activeUser, setActiveUser] = useState(1);
  const [active, setActive] = useState(false);
  const [wid, setWid] = useState(window.screen.width);

  useEffect(() => {
    const updateScreen = () => {
      setWid(window.screen.width);
    };
    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, [wid]);

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  const handleClick = (e) => {
    setClicked(e);
    setActiveUser(e.id);
  };

  const handleNav = () => {
    const profiles = document.querySelector(".profiles");
    const chat = document.querySelector(".chat");

    if (!active) {
      profiles.classList.add("visible");
      setActive(true);
      document.addEventListener("click", handleClickOutside);
    } else {
      setActive(false);
      profiles.classList.remove("visible");
      document.removeEventListener("click", handleClickOutside);
    }

    function handleClickOutside(event) {
      if (!profiles.contains(event.target) && !chat.contains(event.target)) {
        setActive(false);
        profiles.classList.remove("visible");
        document.removeEventListener("click", handleClickOutside);
      }
    }

    if (wid > 1200) {
      profiles.classList.add("visible");
    }
  };

  return (
    <div className="container">
      <div className="profiles">
        <div className="myProfile">
          <div className="myProfile_img">
            <img src={myImg} alt="DP" />
            <div className="green"></div>
          </div>
          <div className="myProfile_name">
            <h3>Sanjoy</h3>
            <p>Frontend Developer</p>
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search contact"
            onChange={(e) => setInput(e.target.value)}
          />
          <CiSearch className="sea" />
        </div>

        <div className="sort" onClick={myFunction}>
          <span className="dropbtn">
            Recent Chats <RiArrowDropDownLine className="dr" />
          </span>
          <div className="dropdown">
            <div id="myDropdown" className="dropdown-content">
              <p>Sort By Time</p>
              <p>Sort By Unread</p>
              <p>Mark as all Read</p>
            </div>
          </div>
        </div>
        <div className="users">
          {users &&
            users
              .filter((item) => {
                return input.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(input);
              })
              .map((data) => {
                return (
                  <div
                    className={`user ${activeUser === data.id ? "active" : ""}`}
                    key={data.id}
                    onClick={(e) => handleClick(data)}
                  >
                    <div className="img">
                      <img src={data.profileImage} alt="" />
                      <div className={`stat ${data.onlineStatus}`}></div>
                    </div>
                    <div className="name">
                      <p>{data.name}</p>
                      <p className="ll">{data.chats[0].slice(0, 20)}...</p>
                    </div>
                    <span className="timee">{data.time}</span>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="chat">
        <MyContext.Provider value={users}>
          <UserChat users={clicked} handleNav={handleNav} />
        </MyContext.Provider>
      </div>
    </div>
  );
};

export default Home;
