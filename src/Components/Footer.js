import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {
  return (
    props.userdata && 
      <div className='footer_tabs'>
      <div className="tab"><Link to="/HomePage/home"><ion-icon name="home-outline"></ion-icon></Link></div>
      <div className="tab"><Link to="/HomePage/search"><ion-icon name="search"></ion-icon></Link></div>
      <div className="tab"><Link to="/HomePage/post"><ion-icon name="add-circle"></ion-icon></Link></div>
      <div className="tab"><Link to="/HomePage/reel"><ion-icon name="film-outline"></ion-icon></Link></div>
      <div className="tab">
        <div className="user_img">
        <Link to="/HomePage/profile">
          <img src={props.userdata.profile_pic} alt="" />
          </Link>
        </div>
      </div>
    </div>
  )
}
