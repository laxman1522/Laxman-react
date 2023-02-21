import "./blogDescription.scss";
import React,{ useCallback, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import oops from "../../assets/oops.png";
import Button from "../../Components/Button/button";
import { updateBlogData, updateblogDetails, updateEditStatus } from "../../Stores";

const BlogDescription: React.FC = () => {

    //INFO: using ref for maintaining the blog title and description 
    const imageRef = useRef<any>();
    const descriptionRef = useRef<any>();
    const titleRef = useRef<any>();
    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch();

    //INFO: updated blog details from redux store/blogDetails
    const blogDetails = useSelector((state: any) => {
        return state.blogDetails.data;
    })

    //INFO: Checking whether the user is allowed to edit or not based on the user button click - edit content
    const allowEdit = useSelector((state: any) => {
        return state.blogDetails.allowEdit;
    })

    //INFO: updated blog Data from redux store/blogs
    const {isLoading, blogData} = useSelector((state: any) => {
        return state.blogs;
    })

    //INFO: for updating the image with dummy image incase any error happens during the image rendering 
    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    //INFO: useEffect for updating the text area height based on the content during the first rendering
    useEffect(() => {
        if(titleRef.current && descriptionRef.current) {
            titleRef.current.style.height = "5px";
            titleRef.current.style.height = (titleRef.current.scrollHeight)+"px";
            descriptionRef.current.style.height = "5px";
            descriptionRef.current.style.height = (descriptionRef.current.scrollHeight)+"px";
        }
    },[blogDetails])

    //INFO: To disatch the action to redux store/blogDetails to update the user edit status
    const buttonClickHandler = useCallback(() => {
        dispatch(updateEditStatus(true));
    },[dispatch])

    /**
     * @description For updating the blog list with updated blog details
     */
    const saveContent = useCallback(() => {
        let index = 0;
        let updatedBlogDetails ;
        let updatedBlogData: any = [];
        for (let blogs of blogData)
        {
            if((index === blogDetails.id) && ((titleRef.current.value !== blogDetails.title) || (descriptionRef.current.value !== blogDetails.details))) {
                updatedBlogDetails = {
                    id: index,
                    title: titleRef.current.value,
                    photo: blogs.photo,
                    details: descriptionRef.current.value,
                    type: blogs.type,
                }
                updatedBlogData.push(updatedBlogDetails)
            } else {
                updatedBlogData.push(blogs);
            }
            index++;
        }
        if(updatedBlogDetails) {
            dispatch(updateblogDetails(updatedBlogDetails));
            dispatch(updateBlogData(updatedBlogData))
        }
        dispatch(updateEditStatus(false));
    },[blogData,blogDetails,descriptionRef,titleRef,dispatch])

    //INFO: To update the user edit status in redux store/blogDetails on button click - cancel
    const cancelHandler = useCallback(() => {
        dispatch(updateEditStatus(false))
    },[dispatch])

    return (
        <div className="blog-description-container">
            {!isLoading &&
            <div className="content-container">
                <img ref={imageRef} src={blogDetails?.photo || oops} alt={blogDetails?.title} onError={errorHandler}></img>
                <textarea ref={titleRef} className="blog-details-title" value={!allowEdit ? blogDetails.title : undefined} defaultValue={blogDetails.title} 
                readOnly={allowEdit ? false : true}></textarea>
                <div className="description">
                    <textarea ref={descriptionRef} className="blog-details-description" defaultValue={blogDetails.details} 
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
        </div>
    )
}

export default BlogDescription;