import "./blogDescription.scss";
import React,{useCallback, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import oops from "../../assets/oops.png";
import Button from "../../Components/Button/button";
import { updateBlogData, updateblogDetails, updateEditStatus } from "../../Stores";

const BlogDescription = () => {

    const imageRef = useRef<any>();
    const descriptionRef = useRef<any>();
    const titleRef = useRef<any>();
    // const [allowEdit, setAllowEdit] = useState(false);
    const dispatch = useDispatch();

    const blogDetails = useSelector((state: any) => {
        return state.blogDetails.data;
    })

    const allowEdit = useSelector((state: any) => {
        return state.blogDetails.allowEdit;
    })

    const {isLoading, blogData} = useSelector((state: any) => {
        return state.blogs;
    })

    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    useEffect(() => {
        titleRef.current.style.height = "5px";
        titleRef.current.style.height = (titleRef.current.scrollHeight)+"px";
        descriptionRef.current.style.height = "5px";
        descriptionRef.current.style.height = (descriptionRef.current.scrollHeight)+"px";
    },[blogDetails])

    const buttonClickHandler = useCallback(() => {
        dispatch(updateEditStatus(true));
        // setAllowEdit(true)
    },[dispatch])

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
                    type: blogs.type
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
        // setAllowEdit(false);
        dispatch(updateEditStatus(false));
    },[blogData,blogDetails,descriptionRef,titleRef,dispatch])

    const cancelHandler = useCallback(() => {
        // setAllowEdit(false);
        dispatch(updateEditStatus(false))
    },[dispatch])

    return (
        <div className="blog-description-container">
            {!isLoading &&
            <div className="content-container">
            <img ref={imageRef} src={blogDetails?.photo || oops} alt={blogDetails?.title} onError={errorHandler}></img>
            <textarea ref={titleRef} className="blog-details-title" value={!allowEdit ? blogDetails.title : undefined} defaultValue={blogDetails.title} 
            readOnly={allowEdit ? false : true}></textarea>
            <textarea ref={descriptionRef} className="blog-details-description" defaultValue={blogDetails.details} 
            value={!allowEdit ? blogDetails.details : undefined} readOnly={allowEdit ? false : true}></textarea>
            {!allowEdit && <Button buttonName={"EDIT CONTENT"} className={"edit-content"} buttonClicked={buttonClickHandler}></Button>}
            {allowEdit && <Button buttonName={"SAVE CONTENT"} className={"save-content"} buttonClicked={saveContent}></Button>}
            {allowEdit && <Button buttonName={"CANCEL"} className={"cancel"} buttonClicked={cancelHandler}></Button>}
            </div>}
            {isLoading && <div className="bar-loader"></div>}
        </div>
    )
}

export default BlogDescription;