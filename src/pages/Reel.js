import React from 'react'
import { posts } from '../data/post'

export default function Reel() {
  return (
    <div className='Reel-box'>
          <div className="reels">
      {posts.map((post, index) => (
        <div className="reel" key={index}>
          <div className="reel_head">
            <div className="user">
              <img src={post.profile_pic} alt="" />
              <div className="caption">
              <span className="user">{post.userName}</span>
              <span className="caption_text">: {post.caption}</span>
            </div>
            </div>
            <div className="menu">
              <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
            </div>
          </div>
          <div className="reel_img">
            <img src={post.post_img} alt="" />
          </div>
          <div className="reel_foot">
            <div className="icon-box">
              <div className="left_icon">
              <ion-icon name="heart-outline"></ion-icon>
                <p className="likes">{post.likes}</p>
                <ion-icon name="chatbox-outline"></ion-icon>
                <ion-icon name="send-outline"></ion-icon>
                <ion-icon name="bookmark-outline" ></ion-icon>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
