import { firebase, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import "../src/css/LoginSignup.css";
import { useNavigate } from "react-router-dom";
let form_change_value = false; // true in login
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
require("firebase/auth");

export default function Login_Signup() {
  let navigate = useNavigate();
  const [userId, setuserId] = useState(null);

  const Form_change = () => { // function to change login form to signup form and vice versa
    let element_change = Array.from(document.querySelectorAll(".change"));
    let element_p_change = Array.from(
      document.querySelectorAll(".change-input")
    );
    document.querySelectorAll(".inputs input").forEach((input) => {
      input.style.border = "none";
    });
    if (!form_change_value) {
      document.querySelector(".change_text").innerText =
        "Don't have an account?";
      document.querySelector("#form_change").innerText = "Sign Up";
      document.querySelector(".form_footer button").innerHTML =
        "Login <div class='lds-dual-ring'></div>";
      form_change_value = true;
    } else {
      document.querySelector(".change_text").innerText =
        "Already have an account?";
      document.querySelector("#form_change").innerText = "Login";
      document.querySelector(".form_footer button").innerHTML =
        "Sign-Up <div class='lds-dual-ring'></div>";
      form_change_value = false;
    }

    element_change.forEach((element) => {
      element.classList.toggle("slide_away");
    });
    element_p_change.forEach((element) => {
      element.classList.toggle("parent_slide");
    });
  };

  const login_signup_func = async (e) => { //function to signin if login form is up and create new user if signup form is up
    e.preventDefault();
    let email = document.getElementById("email_user").value;
    let user_name = document.getElementById("name_user").value;
    let password = document.getElementById("pass_user").value;
    let cnf_password = document.getElementById("pass_cnf_user").value;

    if (email !== "" && password !== "") { // login
      if (form_change_value) {
        document.querySelector(".lds-dual-ring").style.display = "inline-block";
        try {
          const theuser = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
          setuserId(theuser.user.uid);
          console.log("User login successful");
          form_change_value = false;
          document.querySelector(".lds-dual-ring").style.display = "none";
          navigate("/HomePage");
        } catch (error) {
          document.querySelector(".alert p").innerText =
            "Cannot find a user with these credentials";
          document.querySelector(".lds-dual-ring").style.display = "none";
        }
      } else { //signup
        if (user_name !== "" && cnf_password !== "") {
          document.querySelector(".lds-dual-ring").style.display =
            "inline-block";
          try {
            const Current_user = await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);

            const collection_ref = doc(db, "users", Current_user.user.uid);
            await setDoc(collection_ref, {
              user_id: Current_user.user.uid,
              username: user_name,
              email: Current_user.user.email,
              profile_pic:
                "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black.png",
              bio: "",
              name: "",
              followers: 0,
              following: 0,
            });

            const collection_ref_2 = doc(db, "users_Public_data", Current_user.user.uid);
            await setDoc(collection_ref_2, { // add some data in a different collection which is public
              username: user_name,
              name: "",
              followers: 0,
              following: 0,
              profile_pic:
              "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black.png"
            })
            
            document.querySelector(".lds-dual-ring").style.display = "none";
            console.log("New user Created");
            navigate("/HomePage");
          } catch (error) {
            console.log(error);
            document.querySelector(".alert p").innerText =
              error.message.slice(10);
            document.querySelector(".lds-dual-ring").style.display = "none";
          }
        }
      }
    } else {
      document.querySelector(".alert p").innerText =
        "Cannot have an empty field";
    }
  };
// functions for validation of input fields
  const valiadate_email = (e) => {
    if (e.target.value === "") {
      document.getElementById("email_user").style.border = "none";
      disable_btn();
    } else if (e.target.value.match(mailformat)) {
      document.getElementById("email_user").style.border = "2px solid green";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    } else {
      document.getElementById("email_user").style.border = "2px solid red";
      disable_btn();
    }
  };

  function validate_userName(e) {
    // Define a regular expression to match special characters
    const specialCharsRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (e.target.value === "") {
      e.target.style.border = "none";
      disable_btn();
    } else if (e.target.value < 4 || e.target.value > 20) {
      document.querySelector(".alert p").innerText =
        "Username can only be between 4 and 20 characters";
    }

    // Check if the e.target contains any special characters
    else if (specialCharsRegex.test(e.target.value)) {
      document.querySelector(".alert p").innerText =
        "Username cannot contain special characters.";
      e.target.style.border = "2px solid red";
      disable_btn();
    }

    // Check if the e.target contains only letters, numbers, and underscores
    else if (!/^[a-zA-Z0-9_]+$/.test(e.target.value)) {
      document.querySelector(".alert p").innerText =
        "Username can only contain letters, numbers, and underscores.";
      e.target.style.border = "2px solid red";
      disable_btn();
    } else {
      e.target.style.border = "2px solid green";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    }
  }

  const validate_password = (e) => {
    if (e.target === "") {
      e.target.style.border = "2px solid red";
      document.querySelector(".alert p").innerText = "password cannot be empty";
      disable_btn();
    } else if (e.target.value.length < 5) {
      e.target.style.border = "2px solid red";
      document.querySelector(".alert p").innerText =
        "password cannot be shorter then 5 characters";
      disable_btn();
    } else {
      e.target.style.border = "2px solid green";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    }
  };
  const validate_cnf_password = (e) => {
    if (e.target.value === document.getElementById("pass_user").value) {
      e.target.style.border = "2px solid green";
      document.querySelector(".alert p").innerText = "";
      enable_btn();
    } else {
      e.target.style.border = "2px solid red";
      document.querySelector(".alert p").innerText =
        "confirm password does not match password";
      disable_btn();
    }
  };

  const disable_btn = () => {
    let submit_btn = document.getElementById("submit_btn");
    submit_btn.style.backgroundColor = "#bdbebf";
    submit_btn.style.color = "#8e8e8e";
    submit_btn.disabled = true;
  };
  const enable_btn = () => {
    let submit_btn = document.getElementById("submit_btn");
    submit_btn.style.backgroundColor = "#0093c0";
    submit_btn.style.color = "white";
    submit_btn.disabled = false;
  };

  return (
    <>
      <div className="main_container">
        <div className="logo">
          <img src="image/insta_logo.png" alt="" />
        </div>
        <div
          className="alert"
          style={{
            position: "relative",
            color: "black",
            padding: "0.2rem 0.7rem",
          }}
        >
          <p style={{ margin: "0" }}></p>
        </div>
        <div className="form">
          <form action="" method="post">
            <div className="input_fields">
              <div className="email inputs">
                <input
                  id="email_user"
                  type="email"
                  name="email"
                  placeholder="Write your E-mail"
                  required
                  onChange={valiadate_email}
                />
              </div>
              <div className="username inputs change-input">
                <input
                  className="change"
                  id="name_user"
                  type="email"
                  name="user"
                  placeholder="Write your UserName"
                  onChange={validate_userName}
                />
              </div>
              <div className="password inputs">
                <input
                  id="pass_user"
                  type="password"
                  name="email"
                  placeholder="Write the password"
                  required
                  onChange={validate_password}
                />
              </div>
              <div className="password inputs change-input">
                <input
                  className="change"
                  id="pass_cnf_user"
                  type="password"
                  name="pass_cnf"
                  placeholder="Confirm your password"
                  onChange={validate_cnf_password}
                />
              </div>
            </div>
            <div className="form_footer">
              <p className="">
                <span className="change_text">Already have an Account? </span>{" "}
                <span onClick={Form_change} id="form_change">
                  Login
                </span>
              </p>
              <button id="submit_btn" type="submit" onClick={login_signup_func}>
                Sign-Up <div className="lds-dual-ring"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
