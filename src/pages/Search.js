import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [MainUserArr, setMainUserArr] = useState([]);

  const searchHandle = () => { // take input value and filter through the mainUser Array
    let value = document.querySelector(".search-form input").value;
    if (value.length > 0) {
      setUsers(
        MainUserArr.filter((user) => {
          if (user.name.length > 0) {
            return user.name.match(value);
          } else {
            return user.username.match(value);
          }
        })
      );
    }
  };

  const getusers = async () => {
    // get all users in an array
    const allUsers = await getDocs(collection(db, "users_Public_data"));
    setUsers(allUsers.docs.map((doc) => doc.data()));
    setMainUserArr(allUsers.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getusers();
  }, []);
  return (
    <>
      <div className="search-bar">
        <form className="search-form" action="">
          <input placeholder="Search" type="text" />
          <ion-icon onClick={searchHandle} name="search"></ion-icon>
        </form>
      </div>
      <div className="main_center">
        <div className="users_box">
          {users[0] &&
            users.map((user, index) => (
              <div className="user" key={index}>
                <div className="profile_img">
                  <img src={user.profile_pic} alt="" />
                </div>
                <div className="names">
                  <p className="userN">{user.username}</p>
                  <p className="Name">{user.name}</p>
                </div>
                <div className="follow">
                  <div className="follow_box">
                    <p className="value">{user.followers}</p>
                    <p>Followers</p>
                  </div>
                  <div className="follow_box">
                    <p className="value">{user.following}</p>
                    <p>Following</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

