import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db, firebase } from "../firebase";

export default function Profile() {

  const data = useOutletContext();
  const [userPost, setuserPost] = useState([]);
  const [bio_value, setbiovalue] = useState("");
  const [username_value, setusernamevalue] = useState("");
  const [name_value, setnamevalue] = useState("");
  const [img_url_value, setimgurlvalue] = useState("");

  const getpost_func = async () => { // get all post of the user
    const userposts = await getDocs(
      collection(db, "users", firebase.auth().currentUser.uid, "posts")
    );
    setuserPost(userposts.docs.map((doc) => doc.data()));
  };

  const input_span_move = (e) => {
    let inputs = document.querySelectorAll(".input-box input");
    inputs.forEach((input) => {
      if (input.value !== "") {
        input.nextElementSibling.style.bottom = "64%";
      } else {
        input.nextElementSibling.style.bottom = "31%";
      }
    });
  };

  const showEdit = () => { // show edit profile div
    document.querySelector(".edit_profile").classList.toggle("display_toggle");
  };

  const Update_user = async () => { 
    const userref = doc(db, "users", data.user_id);
    const userPublicref = doc(db, "users_Public_data", data.user_id);
    
    let bio = document.querySelector(".bio-box input").value;
    let name = document.querySelector(".name-box input").value;
    let username = document.querySelector(".Username-box input").value;
    let image = document.querySelector(".img-url input").value;
    const user_data = {
      bio: bio,
      name: name,
      profile_pic: image,
      username: username,
    };
    const user_data_2 = {
      name: name,
      profile_pic: image,
      username: username,
    };
    await updateDoc(userref, user_data);
      await updateDoc(userPublicref, user_data_2);
    window.location.reload(true)
  };

  function validate_userName(e) {
    input_span_move();
    // Define a regular expression to match special characters
    const specialCharsRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (e.target.value === "") {
      e.target.style.borderBottom = "1px solid gray";
      disable_btn();
    } else if (e.target.value < 4 || e.target.value > 20) {
      document.querySelector(".alert p").innerText =
        "Username can only be between 4 and 20 characters";
    }

    // Check if the e.target contains any special characters
    else if (specialCharsRegex.test(e.target.value)) {
      document.querySelector(".alert p").innerText =
        "Username can only contain letters, numbers, and underscores.";
      e.target.style.borderBottom = "2px solid red";
      disable_btn();
    }
    //Username cannot contain special characters.

    // Check if the e.target contains only letters, numbers, and underscores
    else if (!/^[a-zA-Z0-9_]+$/.test(e.target.value)) {
      document.querySelector(".alert p").innerText =
        "Username can only contain letters, numbers, and underscores.";
      e.target.style.borderBottom = "2px solid red";
      disable_btn();
    } else {
      e.target.style.borderBottom = "1px solid gray";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    }
  }
  function validate_Name(e) {
    input_span_move();
    const specialCharsRegex = /[^a-zA-Z\s]/g;
    if (e.target.value === "") {
      e.target.style.borderBottom = "1px solid gray";
      disable_btn();
    }

    // Check if the e.target contains any special characters
    else if (specialCharsRegex.test(e.target.value)) {
      document.querySelector(".alert p").innerText =
        "Name can only contain letters";
      e.target.style.borderBottom = "2px solid red";
      disable_btn();
    } else {
      e.target.style.borderBottom = "1px solid gray";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    }
  }

  const disable_btn = () => {
    let submit_btn = document.querySelector(".submit_btn");
    submit_btn.style.backgroundColor = "#bdbebf";
    submit_btn.style.color = "#8e8e8e";
    submit_btn.disabled = true;
  };
  const enable_btn = () => {
    let submit_btn = document.querySelector(".submit_btn");
    submit_btn.style.backgroundColor = "#0093c0";
    submit_btn.style.color = "white";
    submit_btn.disabled = false;
  };
  useEffect(() => {
    getpost_func();
    if (data) {
      setbiovalue(data.bio);
      setimgurlvalue(data.profile_pic);
      setnamevalue(data.name);
      setusernamevalue(data.username);

    }
  }, []);
  return (
    <div className="profile_box">
      {userPost && data && (
        <>
          <div className="profile_head">
            <span className="user">{data.username}</span>
          </div>
          <div className="details">
            <div className="rows">
              <div className="box">
                <img src={data.profile_pic} alt="" />
              </div>
              <div className="box">
                <p className="value">{userPost.length}</p>
                <p className="name">Posts</p>
              </div>
              <div className="box">
                <p className="value">{data.followers}</p>
                <p className="name">Followers</p>
              </div>
              <div className="box">
                <p className="value">{data.following}</p>
                <p className="name">Followings</p>
              </div>
            </div>
            <div className="rows">
              <p className="name">{data.name ? data.name : data.username}</p>
              <p className="bio">{data.bio}</p>
            </div>
            <div onClick={showEdit} className="edit_btn">
              Edit Profile
            </div>
            <div className="edit_profile display_toggle">
              <ion-icon onClick={showEdit} name="close"></ion-icon>
              <div className="alert">
                <p></p>
              </div>
              <form action="">
                <div className="img-url input-box">
                  <input
                    onChange={input_span_move}
                    type="text"
                    value={img_url_value}
                    onInput={(e) => {
                      setimgurlvalue(e.target.value);
                    }}
                    required
                  />
                  <span>Paste the URL for your profile Picture</span>
                </div>
                <div className="Username-box input-box">
                  <input
                    onChange={validate_userName}
                    value={username_value}
                    onInput={(e) => {
                      setusernamevalue(e.target.value);
                    }}
                    type="text"
                  />
                  <span>Change your username</span>
                </div>
                <div className="name-box input-box">
                  <input
                    onChange={validate_Name}
                    value={name_value}
                    onInput={(e) => {
                      setnamevalue(e.target.value);
                    }}
                    type="text"
                  />
                  <span>Change your Name</span>
                </div>
                <div className="bio-box input-box">
                  <input
                    onChange={input_span_move}
                    value={bio_value}
                    onInput={(e) => {
                      setbiovalue(e.target.value);
                    }}
                    type="text"
                  />
                  <span>Add a bio</span>
                </div>
                <div className="submit_btn" onClick={Update_user} type="submit">
                  Update <div className="lds-dual-ring"></div>
                </div>
              </form>
            </div>
          </div>
          <div className="userposts">
            {userPost &&
              userPost.map((post, index) => (
                <div className="userpost" key={index}>
                  <img src={post.imageurl} alt="" />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
