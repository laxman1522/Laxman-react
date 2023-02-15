import "./blogCard.scss";
import React, { useEffect } from "react";
import { blog } from "../../model/common.model";
import { useDispatch, useSelector } from "react-redux";
import { updateblogDetails } from "../../Stores";


const BlogCard: React.FC<blog> = (props: blog) => {

    const {title, type, details} = props;

    const dispatch = useDispatch();

    const blogDetails = useSelector((state: any) =>{
        return state.blogDetails
    })

    useEffect(() => { 
        if(!blogDetails.data?.title && props.id === 0) {
            dispatch(updateblogDetails(props))
        }
    }, [])

    const updateBlogDetailsHandler = () => {
        dispatch(updateblogDetails(props))
    }

    return (
        <div className="blog-card" onClick={updateBlogDetailsHandler}>
            <div className="blog-card-container">
            <div className="heading">{title}</div>
            <div className="blog-type">{type.toLocaleUpperCase()}</div>
            <div className="description">{details}</div>
            </div>
        </div>
    )
}

export default BlogCard;