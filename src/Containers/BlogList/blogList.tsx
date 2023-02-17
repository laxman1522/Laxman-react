import "./blogList.scss";
import React, { useCallback, useEffect, useState } from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateModalState, updateSearch, updateBlogInputs } from "../../Stores";
import { blog } from "../../model/common.model";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";

const BlogList = () => {

    const dispatch = useDispatch<any>();

    const {PLACEHOLDER, NEW, CUSTOM_TYPE} = AppConstants;

    const {isLoading, blogData, error, searchTerm, types} = useSelector((state: any) => {
        return state.blogs;
    })

    const blogList = blogData.map((blog: blog, index: number) => {
        if((types.includes(blog.type.toLocaleLowerCase()) || (blog.type.toLocaleLowerCase()=== CUSTOM_TYPE))  && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            return  <BlogCard key={blog.title} id={index} photo={blog.photo} title={blog?.title} details={blog?.details} type={blog?.type}></BlogCard>
        } 
    })

    useEffect(() => {
        dispatch(fetchBlogs())
    },[])

    const searchHandler = (event: any) => {
        dispatch(updateSearch(event?.target?.value));
    }

    const openModalHandler = useCallback(() => {
        dispatch( updateBlogInputs(true));
    },[])

    const checkBlogList = () => {
        let isBlogEmpty = true;
        const blogList = blogData.map((blog: blog, index: number) => {
            if(blog.type.toLocaleLowerCase() === CUSTOM_TYPE) {
                isBlogEmpty = false;
                return blog;
            }
        })
        return isBlogEmpty;
    }

    return (
        <React.Fragment>
        <div className="blog-list-container">
            <div className="search-bar d-flex">
                <input type="text" id="blog" name="blog" onChange={searchHandler} placeholder={PLACEHOLDER}></input>
                <Button buttonName={NEW} className={"button"} buttonClicked={openModalHandler}></Button>
            </div>
            {blogList}
            {isLoading && <Loader></Loader>}
            {error && <div className="error">Error Occured</div>}
            {((types.length === 0) && checkBlogList()) && <div className="noTypes">List is Empty...Please select the blog type</div>}
        </div>
        </React.Fragment>
    )
}

export default BlogList;