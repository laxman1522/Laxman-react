import "./blogList.scss";
import React, { useEffect, useState } from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch } from "../../Stores";
import { blog } from "../../model/common.model";

const BlogList = () => {

    const dispatch = useDispatch<any>();

    const {isLoading, data, error, searchTerm, types} = useSelector((state: any) => {
        return state.blogs;
    })

    const blogList = data.map((blog: blog, index: number) => {
        if(types.includes(blog.type.toLocaleLowerCase()) && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            return  <BlogCard key={blog.title} id={index} photo={blog.photo} title={blog?.title} details={blog?.details} type={blog?.type}></BlogCard>
        }  
    })

    const {PLACEHOLDER, NEW} = AppConstants;

    useEffect(() => {
        dispatch(fetchBlogs())
    },[])

    const searchHandler = (event: any) => {
        dispatch(updateSearch(event?.target?.value));
    }


    return (
        <React.Fragment>
        <div className="blog-list-container">
            <div className="search-bar d-flex">
                <input type="text" id="blog" name="blog" onChange={searchHandler} placeholder={PLACEHOLDER}></input>
                <button > {NEW}</button>
            </div>
            {blogList}
            {isLoading && <div className="loader"></div>}
            {error && <div className="error">Error Occured</div>}
            {types.length === 0 && <div className="noTypes">List is Empty...Please select the blog type</div>}
        </div>
        </React.Fragment>
    )
}

export default BlogList;