import "./blogList.scss";
import React, { useCallback, useEffect, useRef} from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch, updateBlogInputs } from "../../Stores";
import { blog } from "../../model/common.model";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";

const BlogList = () => {

    const dispatch = useDispatch<any>();
    const searchInputRef = useRef<any>();
    const {PLACEHOLDER, NEW, CUSTOM_TYPE} = AppConstants;

    const {isLoading, blogData, error, searchTerm, types} = useSelector((state: any) => {
        return state.blogs;
    })

    const blogList = blogData.map((blog: blog, index: number) => {
        if((types.includes(blog.type.toLocaleLowerCase()) || (blog.type.toLocaleLowerCase()=== CUSTOM_TYPE))  && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            return  <BlogCard key={blog.title} id={index} photo={blog.photo} title={blog?.title} details={blog?.details} type={blog?.type}></BlogCard>
        } else {
            return undefined;
        }
    })

    useEffect(() => {
        dispatch(fetchBlogs())
    },[])

    const searchHandler = (event: any) => {
        dispatch(updateSearch(event?.target?.value));
    }

    const openModalHandler = useCallback(() => {
        searchInputRef.current.value = ""
        dispatch( updateBlogInputs(true));
    },[dispatch])

    const checkBlogList = () => {
        let isBlogEmpty = !isLoading ? true : false;
        for (let blog of blogList) {
            blog !==undefined && (isBlogEmpty = false)
        }
        return isBlogEmpty;
    }

    return (
        <React.Fragment>
        <div className="blog-list-container">
            <div className="search-bar d-flex">
                <input ref={searchInputRef} type="text" id="blog" name="blog" onChange={searchHandler} placeholder={PLACEHOLDER}></input>
                <Button buttonName={NEW} className={"button"} buttonClicked={openModalHandler}></Button>
            </div>
            <div className="list-container">
                {blogList}
            </div>
            {isLoading && <Loader></Loader>}
            {error && <div className="error">Error Occured</div>}
            {(checkBlogList()) && <div className="noBlogs">No Blogs available....</div>}
        </div>
        </React.Fragment>
    )
}

export default BlogList;