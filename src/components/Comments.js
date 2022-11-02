import React from "react";
import "./Comments.css";

const CommonComment =(props)=>{
    return(
        <div className="comment">
        <a href="/" className="avatar">
          <img id="image" alt="avatar" src={props.src}></img>
        </a>
        <div className="content">
          <a href="/" className="author">
            {props.author}
          </a>
          <div className="metadata">
            <span className="date">{props.timeAgo} !</span>
          </div>
          <div className="text">{props.comments}</div>
        </div>
      </div>
    )
}

export default CommonComment;