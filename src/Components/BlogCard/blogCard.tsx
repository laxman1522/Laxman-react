/* eslint-disable no-restricted-globals */
import "./blogCard.scss";
import React, { useEffect, useRef, useState } from "react";
import { blog } from "../../model/common.model";
import { useDispatch, useSelector } from "react-redux";
import { updateblogDetails } from "../../Stores";


const BlogCard: React.FC<blog> = (props: blog) => {

    const {title, type, details, id} = props;

    const dispatch = useDispatch();
    const cardRef = useRef<any>();

    const allowEdit = useSelector((state: any) => {
        return state.blogDetails.allowEdit;
    })

    const blogDetails = useSelector((state: any) =>{
        return state.blogDetails
    })

    useEffect(() => { 
        if(!blogDetails.data?.title && props.id === 0) {
            cardRef.current = props.id;
            dispatch(updateblogDetails(props))
        }
    }, [])

    const updateBlogDetailsHandler = () => {
        cardRef.current = "";
        if(allowEdit) {
            confirm("This will kick you out of the edit mode. Do u still want to continue ?") && dispatch(updateblogDetails(props))
        } else {
            dispatch(updateblogDetails(props));
        }
    }

    const checkCardStatusHandler = () => {
        return ((blogDetails.data.id === id && cardRef.current ==="") ? "selected" : "blog-card")
    }

    return (
        <div className={checkCardStatusHandler()} onClick={updateBlogDetailsHandler}>
            <div className="blog-card-container">
            <div className="heading">{title}</div>
            <div className="blog-type">{type.toLocaleUpperCase()}</div>
            <div className="description">{details}</div>
            </div>
        </div>
    )
}

export default BlogCard;