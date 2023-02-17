import "./blogDescription.scss";
import React,{useCallback, useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import oops from "../../assets/oops.png";
import Button from "../../Components/Button/button";

const BlogDescription = () => {

    const imageRef = useRef<any>();
    const [allowEdit, setAllowEdit] = useState(false);

    const blogDetails = useSelector((state: any) => {
        return state.blogDetails.data;
    })

    const {isLoading} = useSelector((state: any) => {
        return state.blogs;
    })

    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    const buttonClickHandler = useCallback(() => {
        setAllowEdit(true)
    },[])

    return (
        <div className="blog-description-container">
            {!isLoading &&
            <div className="content-container">
            <img ref={imageRef} src={blogDetails?.photo || oops} alt={blogDetails?.title} onError={errorHandler}></img>
            <div className="heading">{blogDetails?.title}</div>
            <div className="description">{blogDetails?.details}</div>
            <Button buttonName={"EDIT CONTENT"} className={"edit-content"} buttonClicked={buttonClickHandler}></Button>
            </div>}
            {isLoading && <div className="bar-loader"></div>}
        </div>
    )
}

export default BlogDescription;