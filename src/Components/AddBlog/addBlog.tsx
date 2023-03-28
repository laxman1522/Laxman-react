import "./addBlogs.scss";
import React, { useCallback, useRef } from "react";
import { connect } from "react-redux";
import { AppConstants } from "../../Constants/appConstants";
import { addBlogDetails } from "../../Stores";
import Button from "../Button/button";
import PropTypes from "prop-types";

const AddBlogs: React.FC<any> = (props: any) => {

     //INFO: using use ref for maintaining the user input in the modal - blog title & blog description 
     const blogTitleRef = useRef<any>();
     const blogDescriptionRef = useRef<any>();
     const {toggleModal, types, addBlog} = props;
 
     //INFO: destructuring constants
     const { CUSTOM_TYPE, CUSTOM_IMAGE, CUSTOM_TITLE_PLACEHOLDER, CUSTOM_DESCRIPTION_PLACEHOLDER, ALERT, NEW_BLOG} = AppConstants;
 
     /**
      * @description To update the blog list with the provided user details in the add new blog modal.
      */
     const addBlogHandler = useCallback(() => {
         if(blogTitleRef.current.value && blogDescriptionRef.current.value) {
            const updatedTypes =  !types.includes(CUSTOM_TYPE.toLowerCase()) ? [...types,CUSTOM_TYPE.toLowerCase()] : [...types];
              addBlog({
                updatedTypes: updatedTypes,
                CUSTOM_TYPE: CUSTOM_TYPE,
                CUSTOM_IMAGE: CUSTOM_IMAGE,
                blogTitle: blogTitleRef.current.value,
                blogDescription: blogDescriptionRef.current.value
              });
              toggleModal();
              document.getElementById('blogList')?.scrollTo(0,0)
         } else {
             alert(ALERT)
         }
     },[ALERT, CUSTOM_IMAGE, CUSTOM_TYPE, addBlog, toggleModal, types])
 

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

AddBlogs.propTypes = {
    toggleModal: PropTypes.func,
    types: PropTypes.array,
    addBlog: PropTypes.func
}

AddBlogs.defaultProps = {
    toggleModal: () => {},
    types: [],
    addBlog: ()=>{}
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        types: state.blogs.types,
        toggleModal: ownProps.toggleModal
    }
 }

 const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        addBlog: (blogDetails: any) => {
            dispatch(addBlogDetails(blogDetails));
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogs);