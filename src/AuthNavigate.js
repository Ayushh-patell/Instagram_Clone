import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { firebase } from "./firebase";

export default function AuthNavigate({ children }) { // if user is not logged in navigate back to the login/signup page
    let navigate = useNavigate();
    const [currentUser, setcurrentUser] = useState(null)
    const handleUser = (user)=> {
        user ? setcurrentUser(user) : setcurrentUser(null)
        if (!user) {
          return navigate("/login")
        }
    }
useEffect(()=> {
  return firebase.auth().onAuthStateChanged(user=> handleUser(user))
},[])
if (currentUser) {
  return (
      children
      )
    }
}
