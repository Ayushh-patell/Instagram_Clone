import React, { useEffect, useState } from "react";
import Stories from "../Components/Stories";
import Posts from "../Components/Posts";
import { db } from "../firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export default function Home() {
const [all_posts, setall_posts] = useState([])
const getpost_func = async ()=> {
  const allposts = await getDocs(collectionGroup(db, "posts"))
  setall_posts(allposts.docs.map(doc=>doc.data()))
  
}
  useEffect(()=> {
    getpost_func()
  },[])
  return (
    <>
      <Stories />
      <div className="main_center">
        <Posts posts= {all_posts} />
      </div>
    </>
  );
}
//
