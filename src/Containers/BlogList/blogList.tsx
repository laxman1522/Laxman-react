import "./blogList.scss";
import React from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";


const BlogList = () => {

    const {PLACEHOLDER, NEW} = AppConstants;

    return (
        <div className="blog-list-container">
            <div className="search-bar d-flex">
                <input type="text" id="blog" name="blog" placeholder={PLACEHOLDER}></input>
                <button > {NEW}</button>
            </div>
            <BlogCard></BlogCard>
        </div>
    )
}

export default BlogList;