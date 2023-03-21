import "./addBlogs.scss";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppConstants } from "../../Constants/appConstants";
import { addBlogDetails, updateblogDetails, updateTypes } from "../../Stores";
import Button from "../Button/button";

const AddBlogs: React.FC<any> = (props: any) => {

     //INFO: using use ref for maintaining the user input in the modal - blog title & blog description 
     const blogTitleRef = useRef<any>();
     const blogDescriptionRef = useRef<any>();
     const {toggleModal} = props;
 
     //INFO: destructuring constants
     const { CUSTOM_TYPE, CUSTOM_IMAGE, CUSTOM_TITLE_PLACEHOLDER, CUSTOM_DESCRIPTION_PLACEHOLDER, ALERT, NEW_BLOG} = AppConstants;
     
     //INFO: using useDispatch to dispatch actions to redux stores
     const dispatch = useDispatch<any>();
 
 
     //INFO: destructuring the blog list from the redux store/blogs
     const { blogData, types} = useSelector((state: any) => {
         return state.blogs;
     })
 
     /**
      * @description To update the blog list with the provided user details in the add new blog modal.
      */
     const addBlogHandler = useCallback(() => {
         if(blogTitleRef.current.value && blogDescriptionRef.current.value) {
            const updatedBlogData = [];
            const updatedTypes = [...types,"local"]
             const blogDetails = {
                 type: CUSTOM_TYPE,
                 title: blogTitleRef.current.value,
                 photo: CUSTOM_IMAGE,
                 selected: true,
                 details: blogDescriptionRef.current.value,
              };
              updatedBlogData.push(blogDetails);
              for(let blogs of blogData) {
                    updatedBlogData.push({...blogs, selected: false})
              }
              dispatch(addBlogDetails(updatedBlogData));
              dispatch(updateblogDetails(blogDetails));
              dispatch(updateTypes(updatedTypes));
              toggleModal();
              document.getElementById('blogList')?.scrollTo(0,0)
         } else {
             alert(ALERT)
         }
     },[ALERT, CUSTOM_IMAGE, CUSTOM_TYPE, blogData, dispatch, toggleModal, types])
 

    return(
        <React.Fragment>
        <div className="modal-title">{NEW_BLOG}</div>
        <div className="blog-input-content">
            <div className="blog-inputs">
                <input ref={blogTitleRef} type="text" id="title" className="title" name="title" placeholder={CUSTOM_TITLE_PLACEHOLDER}></input>
                <textarea ref={blogDescriptionRef} id="description" className="description" name="description" cols={7} placeholder={CUSTOM_DESCRIPTION_PLACEHOLDER}></textarea>
            </div>
            <Button buttonName={AppConstants.ADD} className={"add"} buttonClicked={addBlogHandler}></Button>
        </div>
        </React.Fragment>
    )
}

export default AddBlogs;