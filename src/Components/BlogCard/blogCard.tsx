/* eslint-disable no-restricted-globals */
import "./blogCard.scss";
import React, { memo } from "react";
import { blog } from "../../model/common.model";
import PropTypes from "prop-types";


const BlogCard = (props: blog) => {

    
    //INFO: destructuring props
    const { selected, updateBlogList} = props;

    const {title,type,details} = props.blogData;

    //INFO: for updating the blog details in the redux store/blogDetails once the user edits the blog details
    const updateBlogDetailsHandler = () => {
            updateBlogList(props.blogData);
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
    updateBlogList: PropTypes.func,
    blogData: PropTypes.object,
    id: PropTypes.number || undefined
}

BlogCard.defaultProps = {
    updateBlogList: () => {},
    blogData: {},
    id: undefined
}


export default memo(BlogCard);