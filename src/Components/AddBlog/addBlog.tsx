import "./addBlogs.scss";
import React, { useCallback, useRef, useState } from "react";
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

     const [titleError, setTitleError] = useState<any>();
     const [descError,setDescError] = useState<any>();
 
     //INFO: destructuring constants
     const { CUSTOM_TYPE, CUSTOM_IMAGE, CUSTOM_TITLE_PLACEHOLDER, CUSTOM_DESCRIPTION_PLACEHOLDER, ALERT, NEW_BLOG, TITLE_ERROR, TITLE_LIMIT, DESC_ERROR, DESC_LIMIT} = AppConstants;
 
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
            titleErrorCheck();
            descriptionErrorCheck();
         }
     },[ALERT, CUSTOM_IMAGE, CUSTOM_TYPE, addBlog, toggleModal, types])

     const onTitleChange = () => {
        titleErrorCheck();
        blogTitleRef.current.value.length > 60 && setTitleError({error: TITLE_LIMIT, status: true});
     }

     const onDescChange = () => {
        descriptionErrorCheck();
        if(blogDescriptionRef.current.offsetHeight < blogDescriptionRef.current.scrollHeight) {
            blogDescriptionRef.current.style.height = (blogDescriptionRef.current.scrollHeight + 30) + "px";
        }
        blogDescriptionRef.current.value.length > 250 && setDescError({error: DESC_LIMIT, status: true})
     }

     const titleErrorCheck = () => {
        (blogTitleRef.current.value !== "" && blogTitleRef.current.value !== undefined ) ? setTitleError({error: TITLE_ERROR,status: false}) : setTitleError({error: TITLE_ERROR,status:true}); 
    }

     const descriptionErrorCheck = () => {
        (blogDescriptionRef.current.value !== "" && blogDescriptionRef.current.value !== undefined) ? setDescError({error: DESC_ERROR,status:false}) : setDescError({error: DESC_ERROR,status:true});
     }
 

    return(
        <React.Fragment>
        <div className="modal-title">{NEW_BLOG}</div>
        <div className="blog-input-content">
            <div className="blog-inputs">
                <input ref={blogTitleRef} type="text" id="title" className="title" name="title" onChange={onTitleChange} placeholder={CUSTOM_TITLE_PLACEHOLDER}></input>
                {titleError?.status && <div className="error">{titleError.error}</div>}
                <textarea ref={blogDescriptionRef} id="description" className="description" onChange={onDescChange} name="description" cols={7} placeholder={CUSTOM_DESCRIPTION_PLACEHOLDER}></textarea>
                {descError?.status && <div className="error">{descError.error}</div>}
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