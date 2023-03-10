/* eslint-disable no-restricted-globals */
import "./blogCard.scss";
import React, { useRef } from "react";
import { blog } from "../../model/common.model";
import { useDispatch, useSelector } from "react-redux";
import { updateblogDetails } from "../../Stores";
import { AppConstants } from "../../Constants/appConstants";
import PropTypes from "prop-types";


const BlogCard = (props: blog) => {

    
    //INFO: destructuring props
    const {title, type, details, selected, updateBlogList} = props;

    const dispatch = useDispatch()

    //INFO: for updating the blog details in the redux store/blogDetails once the user edits the blog details
    const updateBlogDetailsHandler = () => {
            updateBlogList(props);
    }

    return (
        <div className={selected ? "selected" : "blog-card"} onClick={updateBlogDetailsHandler}>
            <div className="blog-card-container">
            <div className="heading">{title}</div>
            <div className="blog-type">{type.toLocaleUpperCase()}</div>
            <div className="description">{details}</div>
            </div>
        </div>
    )
}

BlogCard.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    details: PropTypes.string,
    id: PropTypes.number || undefined
}

BlogCard.defaultProps = {
    title: "",
    type: "",
    details: "",
    id: undefined
}


export default BlogCard;