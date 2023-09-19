import React from "react";

export default function Posts(props) {
  const likeChange = (e)=> { 
    let like_value = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.innerText
    let like_value_elem = parseInt(like_value)
    if(e.target.name==="heart"){ // change icon style to outline heart and change color to white
      e.target.name="heart-outline"
      e.target.style.color = "white"
      like_value_elem-=1
      e.target.parentElement.parentElement.nextElementSibling.firstElementChild.innerText = like_value_elem
    } else { // change icon style to filled heart and change color to pink
      e.target.name="heart"
      e.target.style.color = "hotpink"
      like_value_elem+=1
      e.target.parentElement.parentElement.nextElementSibling.firstElementChild.innerText = like_value_elem

    }
  }
  const openComments = (e) => {
   e.target.nextElementSibling.classList.toggle("expand");
  };
  return (
    props.posts && 
    (<div className="posts">
    {props.posts.map((post, index) => (
      <div className="post" key={index}>
        <div className="post_head">
          <div className="user">
            <img src={post.profile_pic} alt="" />
            <span>{post.user}</span>
          </div>
          <div className="menu">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
        </div>
        <div className="post_img">
          <img src={post.imageurl} alt="" />
        </div>
        <div className="post_foot">
          <div className="icon-box">
            <div className="left_icon">
              <ion-icon onClick={likeChange} name="heart-outline"></ion-icon>
              <ion-icon name="chatbox-outline"></ion-icon>
              <ion-icon name="send-outline"></ion-icon>
            </div>
            <div className="right_icon" style={{cursor: "pointer"}}>
              <ion-icon name="bookmark-outline" ></ion-icon>
            </div>
          </div>
          <p className="likes"><span className="like_value">{post.likes}</span><span className="like_name">{(post.likes>1)? ` Likes`: ` Like`}</span></p>
          <div className="caption">
            <span className="user">{post.user}</span>
            <span className="caption_text">: {post.caption}</span>
          </div>
          {post.comments[0] && (
            <div className="comment-box">
              <p className="comment_toggle" onClick={openComments}>
                View{" "}
                {post.comments.length > 1
                  ? `all ${post.comments.length} comments`
                  : "1 comment"}
              </p>
              <div className="comments">
                {post.comments.map((cmt, index) => (
                  <div className="comment" key={index + "cmt"}>
                    <p className="comment_user">{cmt.cmt_user}</p>
                    <p className="comment_text">{cmt.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>)
  );
}
