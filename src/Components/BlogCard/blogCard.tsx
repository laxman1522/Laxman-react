/* eslint-disable no-restricted-globals */
import "./blogCard.scss";
import React, { useEffect, useRef } from "react";
import { blog } from "../../model/common.model";
import { useDispatch, useSelector } from "react-redux";
import { updateblogDetails } from "../../Stores";
import { AppConstants } from "../../Constants/appConstants";
import PropTypes from "prop-types";


const BlogCard = (props: blog) => {

    
    //INFO: destructuring props
    const {title, type, details, id} = props;
    const {CONFIRM, CUSTOM_TYPE} = AppConstants;
     //INFO: using useDispatch to dispatch actions to redux stores
     const dispatch = useDispatch();

     //INFO: maintaining useRef for checking the blog is selected or not
     const cardRef = useRef<any>();

      //INFO: destructuring the available blog details from the redux store/blogs
    const { blogAdded, searchTerm, types} = useSelector((state: any) => {
        return state.blogs;
    })

    //INFO: Checking whether the user is allowed to edit or not based on the user button click - edit content
    const allowEdit = useSelector((state: any) => {
        return state.blogDetails.allowEdit;
    })

    //INFO: updated blog details from redux store/blogDetails
    const blogDetails = useSelector((state: any) =>{
        return state.blogDetails
    })

    useEffect(() => {
        if(blogAdded && type === CUSTOM_TYPE) {
            dispatch(updateblogDetails(props));
            cardRef.current = "";
        }
        else if(searchTerm !=="" && title.toLowerCase().includes(searchTerm)) {
            if(id === 1) {
                dispatch(updateblogDetails(props));
                cardRef.current = "";
            }
        } else {
            if(blogDetails.data.title && types.includes(blogDetails.data.type.toLocaleLowerCase())) { 
                if(blogDetails.data.title === title) {
                    dispatch(updateblogDetails(props));
                    cardRef.current = "";
                }
            }
            else if(id===1){
                dispatch(updateblogDetails(props));
                cardRef.current = "";
            } 
        }
    },[props, searchTerm])


    //INFO: for updating the blog details in the redux store/blogDetails once the user edits the blog details
    const updateBlogDetailsHandler = () => {
        if(checkCardStatusHandler() !=="selected") {
            cardRef.current = "";
            if(allowEdit) {
                confirm(CONFIRM) && dispatch(updateblogDetails(props))
            } else {
                dispatch(updateblogDetails(props));
            }
        }
        
    }

    //INFO: To check whether the card is selected or not
    const checkCardStatusHandler = () => {
        return ((blogDetails.data.id === id && cardRef.current ==="") ? "selected" : "blog-card")
    }

    return (
        <div className={checkCardStatusHandler()} onClick={updateBlogDetailsHandler}>
            <div className="blog-card-container">
            <div className="heading">{title}</div>
            <div className="blog-type">{type.toLocaleUpperCase()}</div>
            <div className="description">{details}</div>
            </div>
        </div>
    )
}

BlogCard.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    details: PropTypes.string,
    id: PropTypes.number || undefined
}

BlogCard.defaultProps = {
    title: "",
    type: "",
    details: "",
    id: undefined
}


export default BlogCard;