import "./addBlogs.scss";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppConstants } from "../../Constants/appConstants";
import { addBlogDetails } from "../../Stores";
import Button from "../Button/button";

const AddBlogs = () => {

     //INFO: using use ref for maintaining the user input in the modal - blog title & blog description 
     const blogTitleRef = useRef<any>();
     const blogDescriptionRef = useRef<any>();
 
     //INFO: destructuring constants
     const { CUSTOM_TYPE, CUSTOM_IMAGE, CUSTOM_TITLE_PLACEHOLDER, CUSTOM_DESCRIPTION_PLACEHOLDER, ALERT, NEW_BLOG} = AppConstants;
     
     //INFO: using useDispatch to dispatch actions to redux stores
     const dispatch = useDispatch<any>();
 
 
     //INFO: destructuring the blog list from the redux store/blogs
     const { blogData} = useSelector((state: any) => {
         return state.blogs;
     })
 
     /**
      * @description To update the blog list with the provided user details in the add new blog modal.
      */
     const addBlogHandler = useCallback(() => {
         if(blogTitleRef.current.value && blogDescriptionRef.current.value) {
             const blogDetails = {
                 type: CUSTOM_TYPE,
                 title: blogTitleRef.current.value,
                 photo: CUSTOM_IMAGE,
                 details: blogDescriptionRef.current.value,
              };
              const blogs = [ blogDetails, ...blogData];
              dispatch(addBlogDetails(blogs));
         } else {
             alert(ALERT)
         }
     },[ALERT, CUSTOM_IMAGE, CUSTOM_TYPE, blogData, dispatch])
 

    return(
        <React.Fragment>
        <div className="modal-title">{NEW_BLOG}</div>
        <div className="blog-input-content">
            <div className="blog-inputs">
                <input ref={blogTitleRef} type="text" id="title" name="title" placeholder={CUSTOM_TITLE_PLACEHOLDER}></input>
                <textarea ref={blogDescriptionRef} id="description" name="description" cols={7} placeholder={CUSTOM_DESCRIPTION_PLACEHOLDER}></textarea>
            </div>
            <Button buttonName={AppConstants.ADD} className={"add"} buttonClicked={addBlogHandler}></Button>
        </div>
        </React.Fragment>
    )
}

export default AddBlogs;