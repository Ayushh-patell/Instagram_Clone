import React from "react";
import { db, firebase } from "../firebase";
import { useOutletContext } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const data = useOutletContext();
  let navigate = useNavigate();

  const AddPostToDB = (e) => {
    document.querySelector(".lds-dual-ring").style.display = "inline-block"; // loading start
    e.preventDefault();
    let img_url_value = document.querySelector(".img-url input").value
    let caption_value = document.querySelector(".caption-box input").value
    try {
    addDoc(collection(db, "users", data.Doc_id, "posts"), { // add post to the "posts" collection in current user's collection
      imageurl: img_url_value,
      user: data.username,
      profile_pic: data.profile_pic,
      owner_uid: firebase.auth().currentUser.uid,
      caption: caption_value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: []
    })
    document.querySelector(".lds-dual-ring").style.display = "none"; //loading stop
    console.log("post uploaded")
    navigate("/HomePage/home") //navigate back to homepage
    } catch (error) {
      document.querySelector(".lds-dual-ring").style.display = "none";
      console.log(error)
    }

  }

  const input_span_move =()=> { // moving span of the input up when there is any value in the input
    let img_url = document.querySelector(".img-url input").value;
    (img_url === "")? document.querySelector(".image-box img").setAttribute("src", "/image/placeholder.jpg") : document.querySelector(".image-box img").setAttribute("src", img_url)
    let inputs = document.querySelectorAll(".input-box input");
        inputs.forEach(input=> {
            if(input.value!== "") {
                input.nextElementSibling.style.bottom = "64%"
            }
            else {
                input.nextElementSibling.style.bottom = "31%"
            }
        })
    }
  return (
    <div className="post-box">
      <div className="image-box">
        <img src="./image/placeholder.jpg" alt="" />
      </div>
      <div className="details">
        <form action="">
          <div className="img-url input-box">
            <input onChange={input_span_move} type="text" required />
            <span>Paste the url of the image to post</span>
          </div>
          <div className="caption-box input-box">
            <input onChange={input_span_move} type="text" />
            <span>Write your caption here</span>
          </div>
          <div className="submit_btn" onClick={AddPostToDB} type="submit">Post <div className="lds-dual-ring"></div></div>
        </form>
      </div>
    </div>
  );
}
