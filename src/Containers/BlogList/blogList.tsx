/* eslint-disable no-restricted-globals */
import "./blogList.scss";
import React, { useCallback, useEffect, useRef} from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch, updateblogDetails, updateBlogData } from "../../Stores";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";

const BlogList: React.FC<any> = (props: any) => {

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();

    const {showAddBlogModal, showWarningModal} = props;

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
        if(blogDetails.allowEdit) {
            showWarningModal(selectedBlog)
        }
        else {
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
    }

    //INFO: Mapping through the available blog list and returning the jsx for individual blog in a card format 
    const blogList = blogData.filter((blog: any, index: number) => {
        //INFO: (checking whether the blog is included in the user selected types or a part of custom type) and matches the user search term
        if((types.includes(blog.type.toLocaleLowerCase()))  && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            //Saving only the filtered blog title which mets all the conditions
            filteredBlogTitle.push(blog.title)
            return blog;
        }
    }).map((blog:any, index: number) => {
        let selected = false;
         if(searchTerm !=="" && blog.title.toLowerCase().includes(searchTerm) && (index===0)) {
            dispatch(updateblogDetails(blog))
            selected = true;
        } else {
            if(blogDetails.data.title && (blogDetails.data.title !== blog.title) && types.includes(blogDetails.data.type.toLocaleLowerCase()) && (blogDetails.data.title === blog.title) && (index===0)) {
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
        return <BlogCard key={blog.title} blogData={blog} updateBlogList={updateBlogList} selected={selected || blog?.selected} ></BlogCard>
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
        dispatch( updateSearch(""));
        showAddBlogModal();
        
    },[dispatch, showAddBlogModal])

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
            <div className="list-container" id="blogList">
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