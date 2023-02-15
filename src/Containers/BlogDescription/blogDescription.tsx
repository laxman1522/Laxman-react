import "./blogDescription.scss";
import React,{useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import oops from "../../assets/oops.png";

const BlogDescription = () => {

    const imageRef = useRef<any>();

    const blogDetails = useSelector((state: any) => {
        return state.blogDetails.data;
    })

    const {isLoading} = useSelector((state: any) => {
        return state.blogs;
    })

    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    return (
        <div className="blog-description-container">
            {!isLoading &&
            <div className="content-container">
            <img ref={imageRef} src={blogDetails?.photo || oops} alt={blogDetails?.title} onError={errorHandler}></img>
            <div className="heading">{blogDetails?.title}</div>
            <div className="description">{blogDetails?.details}</div>
            </div>}
            {isLoading && <div className="loader"></div>}
        </div>
    )
}

export default BlogDescription;