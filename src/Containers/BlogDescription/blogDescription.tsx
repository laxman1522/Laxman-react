import "./blogDescription.scss";
import React,{ useCallback, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import oops from "../../assets/oops.png";
import Button from "../../Components/Button/button";
import {   updateEditedBlogDetails, updateEditStatus } from "../../Stores";
import { AppConstants } from "../../Constants/appConstants";

const BlogDescription: React.FC = () => {

    //INFO: using ref for maintaining the blog title and description 
    const imageRef = useRef<any>();
    const descriptionRef = useRef<any>();
    const titleRef = useRef<any>();
    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch();

    //INFO: updated blog Data from redux store/blogs
    const {isLoading, allowEdit, blogDetails} = useSelector((state: any) => {
        return state.blogs;
    })

    //INFO: for updating the image with dummy image incase any error happens during the image rendering 
    const errorHandler = () => {
       (imageRef.current.src = oops);
    }

    //INFO: To disatch the action to redux store/blogDetails to update the user edit status
    const buttonClickHandler = useCallback(() => {
        dispatch(updateEditStatus(true));
    },[dispatch])

    /**
     * @description For updating the blog list with updated blog details
     */
    const saveContent = useCallback(() => {
        dispatch(updateEditedBlogDetails({titleDefaultValue: titleRef.current.defaultValue,title:titleRef.current.value, description: descriptionRef.current.value}))
    },[descriptionRef, titleRef, dispatch])

    //INFO: To update the user edit status in redux store/blogDetails on button click - cancel
    const cancelHandler = useCallback(() => {
        dispatch(updateEditStatus(false))
    },[dispatch])

    return (
        <div className="blog-description-container">
            {(!isLoading && blogDetails.title) &&
            <div className="content-container">
                <img ref={imageRef} src={blogDetails?.photo || oops} alt={blogDetails?.title} onError={errorHandler}></img>
                <textarea ref={titleRef} className="blog-details-title" value={!allowEdit ? blogDetails.title : undefined}  
                readOnly={allowEdit ? false : true}></textarea>
                <div className="description">
                    <textarea ref={descriptionRef} className="blog-details-description" 
                    value={!allowEdit ? blogDetails.details : undefined} readOnly={allowEdit ? false : true}></textarea>
                </div>
                {!allowEdit && <Button buttonName={"EDIT CONTENT"} className={"edit-content"} buttonClicked={buttonClickHandler}></Button>}
                {allowEdit && 
                    <React.Fragment>
                        <Button buttonName={"SAVE CONTENT"} className={"save-content"} buttonClicked={saveContent}></Button>
                        <Button buttonName={"CANCEL"} className={"cancel"} buttonClicked={cancelHandler}></Button>
                    </React.Fragment>
                }
            </div>}
            {isLoading && <div className="bar-loader"></div>}
            {(!blogDetails.title && !isLoading) && <div className="no-blogs">{AppConstants.NO_BLOGS}</div>}
        </div>
    )
}

export default BlogDescription;