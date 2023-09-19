import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom'
import Chat from "./Components/Chat";
import { firebase, colref, query, where, getDocs } from "./firebase";

const handleLogout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Signed Out");
  } catch (error) {
    console.log(error);
  }
};

const chat_toggle = () => {
  let chat_tab = document.querySelector(".chat_tab");
  let main_cont = document.querySelector(".home_container");
  let body = document.querySelector("body");
  if (window.innerWidth < 841) {
    body.classList.toggle("sml_screen_chat");
  }
  chat_tab.classList.toggle("chat_expand");
  main_cont.classList.toggle("cont_expand");
};

export default function Loggedin() {
  const [data, setdata] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      let current_user = firebase.auth().currentUser.uid;
      if (current_user) {
        const user_q = query(colref, where("user_id", "==", current_user));
        const user_snap = await getDocs(user_q);
        user_snap.forEach((doc) => {
          setdata({...doc.data(), Doc_id:doc.id});
        });
        navigate("/HomePage/home")
      }
    };
    getUser();
  }, []);
  return (
    <>
      <Header chat_toggle={chat_toggle} handleLogout={handleLogout} />
      <div className="home_page" style={{ backgroundColor: "black" }}>
        <div className="home_container cont_expand">
          <div className="main">

            <Outlet context={data}/>
          </div>
        </div>
        <Chat chat_toggle={chat_toggle} data={data} />
      </div>
      <Footer userdata={data} />
    </>
  );
}

