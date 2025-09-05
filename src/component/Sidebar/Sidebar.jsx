import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { allChats, newChat, loadChat, activeChatId, deleteChat } =
    useContext(Context);

  const previousPrompts = Object.keys(allChats).map((chatId) => ({
    id: chatId,
    title: allChats[chatId][0]?.prompt || "New Chat",
  }));

  const handleDelete = (e, chatId) => {
    // This stops the click from also triggering the loadChat function on the parent div
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {previousPrompts.reverse().map((item) => (
              <div
                onClick={() => loadChat(item.id)}
                className={`recent-entry ${
                  item.id === activeChatId ? "active" : ""
                }`}
                key={item.id}
              >
                <img src={assets.message_icon} alt="" />
                <p>{item.title.slice(0, 18)} ...</p>
                <img
                  src={assets.delete_icon}
                  alt="Delete chat"
                  className="delete-icon"
                  onClick={(e) => handleDelete(e, item.id)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
