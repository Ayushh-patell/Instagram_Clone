import React from "react";
import {Users} from '../data/stories'

export default function Chat(porps) {
  return (
    <div className="chat_tab">
      <div className="chat_head">
        <span onClick={porps.chat_toggle} style={{display:"flex"}}><ion-icon name="arrow-back-outline"></ion-icon></span>
        {porps.data && 
        <p className="user" style={{height:"26px"}}>{porps.data.username}</p>
        }
      </div>
      <p className="title">Messages</p>
      <div className="messages">
        {Users.map((chat, index)=> (
          <div className="chat" key={`${index} chat`}>
          <div className="img_box"><img src={chat.user_img} alt="" /></div>
          <div className="message_tab">
            <p className="user">{chat.name}</p>
            <p className="message">Reacted 😂 to your message</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
