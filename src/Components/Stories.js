import React from 'react'
import {Users} from '../data/stories'

export default function Stories() {
  return (
    <div className='stories'>
      {Users.map((user, index)=> (
        <div className="story" key={index}>
            <img src={user.user_img} alt="profile pic" />
            <p>{(user.user_name.length > 11)? user.user_name.slice(0,12)+"...":user.user_name}</p>
        </div>
      ))}
    </div>
  )
}
