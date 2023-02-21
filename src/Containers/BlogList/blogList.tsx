import "./blogList.scss";
import React, { useCallback, useEffect, useRef} from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch, updateBlogInputs, updateblogDetails } from "../../Stores";
import { blog } from "../../model/common.model";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";

const BlogList: React.FC = () => {

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();
    //INFO:using Ref for capturing user inputs - search blogs 
    const searchInputRef = useRef<any>();
    let i = 0;
    //INFO: destructuring constants
    const {PLACEHOLDER, NEW, CUSTOM_TYPE} = AppConstants;

    //INFO: destructuring the available blog details from the redux store/blogs
    const {isLoading, blogData, error, searchTerm, types} = useSelector((state: any) => {
        return state.blogs;
    })


    //Mapping through the available blog list and returning the jsx for individual blog in a card format 
    const blogList = blogData.map((blog: blog, index: number) => {
        //INFO: (checking whether the blog is included in the user selected types or a part of custom type) and matches the user search term
        if((types.includes(blog.type.toLocaleLowerCase()) || (blog.type.toLocaleLowerCase()=== CUSTOM_TYPE.toLocaleLowerCase()))  && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            i++;
            return  <BlogCard key={blog.title} id={i} photo={blog.photo} title={blog?.title} details={blog?.details} type={blog?.type}></BlogCard>
        } else {
            return undefined;
        }
    })

    //INFO: using useEffect for fetching blogs during the first render
    useEffect(() => {
        dispatch(fetchBlogs())
    },[dispatch])

    //INFO: for updating the search term
    const searchHandler = (event: any) => {
        dispatch(updateSearch(event?.target?.value));
    }

    //INFO: To open the modal and allow the user to create new blogs
    const openModalHandler = useCallback(() => {
        searchInputRef.current.value = ""
        dispatch( updateBlogInputs(true));
    },[dispatch])

    //INFO: To check whether the blog list is empty or not
    const isBlogListEmpty = () => {
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
            {(isBlogListEmpty()) && <div className="noBlogs">No Blogs available....</div>}
        </div>
        </React.Fragment>
    )
}

export default BlogList;