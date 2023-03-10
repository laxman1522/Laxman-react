/* eslint-disable no-restricted-globals */
import "./blogList.scss";
import React, { useCallback, useEffect, useRef} from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch, updateBlogInputs, updateblogDetails, updateBlogData } from "../../Stores";
import { blog } from "../../model/common.model";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";

const BlogList: React.FC = () => {

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();

    //INFO:using Ref for capturing user inputs - search blogs 
    const searchInputRef = useRef<any>();
    const filteredBlogTitle: any = [];
    //INFO: destructuring constants
    const {PLACEHOLDER, NEW, NO_BLOGS} = AppConstants;

    //INFO: destructuring the available blog details from the redux store/blogs
    const {isLoading, blogData, error, searchTerm, types, blogAdded} = useSelector((state: any) => {
        return state.blogs;
    })

    //INFO: updated blog details from redux store/blogDetails
    const blogDetails = useSelector((state: any) =>{
        return state.blogDetails
    })

    const updateBlogList = (selectedBlog: any) => {
        const updatedBlogData: any = []
        for(let blog of blogData) {
            if(blog.title === selectedBlog.title) {
                dispatch(updateblogDetails(blog))
                updatedBlogData.push({...blog, selected: true});
            } else {
                updatedBlogData.push({...blog, selected: false});
            }
        }
        dispatch(updateBlogData(updatedBlogData));
    }

    //Mapping through the available blog list and returning the jsx for individual blog in a card format 
    const blogList = blogData.filter((blog: blog, index: number) => {
        //INFO: (checking whether the blog is included in the user selected types or a part of custom type) and matches the user search term
        if((types.includes(blog.type.toLocaleLowerCase()))  && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            filteredBlogTitle.push(blog.title)
            return blog;
        }
    }).map((blog:blog, index: number) => {
        let selected = false;
         if(searchTerm !=="" && blog.title.toLowerCase().includes(searchTerm) && (index===0)) {
            dispatch(updateblogDetails(blog))
            selected = true;
        } else {
            if(blogDetails.data.title && types.includes(blogDetails.data.type.toLocaleLowerCase()) && (blogDetails.data.title === blog.title) && (index===0)) {
                dispatch(updateblogDetails(blog)) 
                selected = true;
            }
            else if(blog.title === blogDetails.data.title) {
                selected = true;
            }
             else if(index===0 && ( types.length !== blogAdded ? 4 : 3 ) && !filteredBlogTitle.includes(blogDetails.data.title)) {
                    dispatch(updateblogDetails(blog))
                    selected = true;
            }
            
        }
        return <BlogCard key={blog.title} updateBlogList={updateBlogList} id={index + 1} selected={selected || blog?.selected} photo={blog.photo} 
        title={blog?.title} details={blog?.details} type={blog?.type}></BlogCard>
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
        if(!isLoading && blogList.length === 0) {
            blogDetails.data.length!==0 &&  dispatch(updateblogDetails([]))
            return true;
        } else {
            return false;
        }
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
            {(isBlogListEmpty()) && <div className="noBlogs">{NO_BLOGS}</div>}
        </div>
        </React.Fragment>
    )
}

export default BlogList;