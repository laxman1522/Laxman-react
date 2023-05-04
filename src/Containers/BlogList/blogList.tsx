/* eslint-disable no-restricted-globals */
import "./blogList.scss";
import React, { useCallback, useEffect, useRef, useState} from "react";
import { AppConstants } from "../../Constants/appConstants";
import BlogCard from "../../Components/BlogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateSearch, updateblogDetails, updateBlogDetails, updateEditStatus } from "../../Stores";
import Loader from "../../Components/Loader/loader";
import Button from "../../Components/Button/button";
import Modal from "../../Components/Modal/modal";
import ModalWarning from "../../Components/modalWarning/modalWarning";

const BlogList: React.FC<any> = (props: any) => {

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();

    const {showAddBlogModal, showWarningModal} = props;

    const selectedIndex = useRef<any>(0);

    const [modal, setModal] = useState<any>('');

    //INFO:using Ref for capturing user inputs - search blogs 
    const searchInputRef = useRef<any>();
    const filteredBlogTitle = useRef<any>([]);
    //INFO: destructuring constants
    const {PLACEHOLDER, NEW, NO_BLOGS, MODALS,CONFIRM, PRIMARY_BUTTON, SECONDARY_BUTTON} = AppConstants;

    //INFO: destructuring the available blog details from the redux store/blogs
    const {isLoading, blogData, error, searchTerm, types, blogAdded, blogDetails, allowEdit} = useSelector((state: any) => {
        return state.blogs;
    })

    const updateBlogList = useCallback((selectedBlog: any) => {
        if(allowEdit) {
            showWarningModal({
                interaction: "blogUpdate",
                data: selectedBlog
            })
        }
        else {
            dispatch(updateBlogDetails(selectedBlog.title))
        }
    },[allowEdit, dispatch, showWarningModal])

    //INFO: Mapping through the available blog list and returning the jsx for individual blog in a card format 
    const blogList = blogData.filter((blog: any, index: number) => {
        index === 0 && (filteredBlogTitle.current = [])
        //INFO: (checking whether the blog is included in the user selected types or a part of custom type) and matches the user search term
        if((types.includes(blog.type.toLocaleLowerCase())) && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            //Saving only the filtered blog title which mets all the conditions
            filteredBlogTitle.current.push(blog.title)
            return blog;
        }
    }).map((blog:any, index: number) => {
        if(!allowEdit) {
         if(searchTerm !=="" && blog.title.toLowerCase().includes(searchTerm) && (index===0)) {
            dispatch(updateblogDetails(blog))
            selectedIndex.current = index;
        } else {
            if(blogDetails.title && (blogDetails.title !== blog.title) && types.includes(blogDetails.type.toLocaleLowerCase()) && (blogDetails.title === blog.title) && (index===0)) {
                    dispatch(updateblogDetails(blog)) 
                    selectedIndex.current = index;
            }
            else if(blog.title === blogDetails.title) {
                selectedIndex.current = index;
            }
             else if(index===0 && ( types.length !== blogAdded ? 4 : 3 ) && !filteredBlogTitle.current.includes(blogDetails.title)) {
                    dispatch(updateblogDetails(blog))
                    selectedIndex.current = index;
            }  
        }
    }
        return <BlogCard key={blog.title} blogData={blog} updateBlogList={updateBlogList} selected={selectedIndex.current === index} ></BlogCard>
    })

    //INFO: using useEffect for fetching blogs during the first render
    useEffect(() => {
        dispatch(fetchBlogs())
    },[dispatch])

    //INFO: for updating the search term
    const searchHandler = (event: any) => {
        if(!allowEdit) {
            dispatch(updateSearch(event?.target?.value));
        } else {
            setModal(MODALS.WARNING_MODAL);
        }
        
    }

    //INFO: To open the modal and allow the user to create new blogs
    const openModalHandler = useCallback(() => {
        if(!allowEdit) {
            searchInputRef.current.value = ""
            dispatch( updateSearch(""));
            showAddBlogModal();
        } else {
            showWarningModal({
                interaction: "newBlogModal",
                data: ""
            })
        }
        
    },[dispatch, showAddBlogModal, allowEdit])

    //INFO: To check whether the blog list is empty or not
    const isBlogListEmpty = () => {
        if(!isLoading && blogList.length === 0) {
            blogDetails.length!==0 &&  dispatch(updateblogDetails([]))
            return true;
        } else {
            return false;
        }
    }

    //INFO: For closing the modal on backdrop
    const toggleModal = useCallback(() => {
        setModal('');
    },[])

    //INFO: For closing the warning modal and updating the blog details if the user clicks continue in the warning pop up
    const continueHandler = () => {
            dispatch(updateEditStatus(false));
            dispatch(updateSearch(searchInputRef.current.value)); 
            setModal(''); 
    }

     //INFO: For taking the user back to the edit mode once the user clicks cancel in the warning pop up
     const cancelHandler = () => {
        searchInputRef.current.value = "";
        setModal('');
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
        <div className="warning-pop-up">
                {modal === MODALS.WARNING_MODAL && <Modal toggleModal={toggleModal}>
                        <ModalWarning message={CONFIRM} allow={continueHandler}  cancel={cancelHandler} primaryButton={PRIMARY_BUTTON}
                        secondaryButton={SECONDARY_BUTTON}></ModalWarning>
                    </Modal>}
            </div>
        </React.Fragment>
    )
}

export default BlogList;