import React from "react";
import "./ImageList.css";

const ImageList=(props)=>{

    const images=props.images.map((image)=>{
        return(
            <img key={image.id} src={image.urls.regular}></img>
        )
    });

    return(
         <div className="image">{images}</div>     
    )
}

export default ImageList;