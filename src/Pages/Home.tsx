import "./Home.scss";
import React, { useCallback, useState } from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";
import Modal from "../Components/Modal/modal";
import UserList from "../Components/UserList/userList";
import AddBlogs from "../Components/AddBlog/addBlog";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button/button";
import { updateblogDetails, updateBlogData, updateBlogDetails } from "../Stores";
import { AppConstants } from "../Constants/appConstants";

const Home = () => {

    const [showWarningModal, setShowWarningModal] = useState<any>(false);
    const [membersModal, setMembersModal] = useState<any>(false);
    const [addBlogModal, setAddBlogModal] = useState<any>(false);
    const [selectedBlog, setSelectedBlog] = useState<any>();
     //INFO: using useDispatch to dispatch actions to redux stores
     const dispatch = useDispatch<any>();
 
     //INFO: destructuring the available blog details from the redux store/blogs
     const { blogData} = useSelector((state: any) => {
         return state.blogs;
     })

     //INFO: For showing the warning modal if user tries to update the different blog details while editing the blog details
    const warningModalHandler = (selectedBlog: any) => {
        setSelectedBlog(selectedBlog);
        setShowWarningModal(true);
    }

    //INFO: For closing the modal on backdrop
    const toggleModal = useCallback(() => {
        membersModal && setMembersModal(false);
        showWarningModal && setShowWarningModal(false);
        addBlogModal && setAddBlogModal(false);
    },[addBlogModal, membersModal, showWarningModal])

    //INFO: For closing the warning modal and updating the blog details if the user clicks continue in the warning pop up
    const continueHandler = () => {
        dispatch(updateBlogDetails(selectedBlog.title))
        setShowWarningModal(false);
    }

    //INFO: For taking the user back to the edit mode once the user clicks cancel in the warning pop up
    const editHandler = () => {
        setShowWarningModal(false);
    }

    //INFO: For showing the user modal once the user clicks the view members button
    const showMembersModal = useCallback(() => {
        setMembersModal(true);
    },[])

    //INFO: For showing the Add Blog form to the user once the user clicks the new button in the blog list container
    const addBlogModalHandler = useCallback(() => {
        setAddBlogModal(true);
    },[])

    return (
        <div className="home-container d-flex">
            <SideBar showMembersModal={showMembersModal}></SideBar>
            <BlogList showWarningModal={warningModalHandler} showAddBlogModal={addBlogModalHandler}></BlogList>
            <BlogDescription></BlogDescription>
            <div className="user-modal">
            {membersModal && <Modal toggleModal={toggleModal}>
                <UserList></UserList>
            </Modal> }
            </div>
            <div className="new-blog-modal">
            {addBlogModal && <Modal toggleModal={toggleModal}>
                <AddBlogs toggleModal={toggleModal}></AddBlogs>
            </Modal> }
            </div>
            <div className="warning-pop-up">
                {showWarningModal && <Modal toggleModal={toggleModal}>
                        <div className="warning">
                            <div className="message">{AppConstants.CONFIRM} </div>
                            <div className="button">
                                <Button buttonName="No" buttonClicked={editHandler} className={"no"}></Button>
                                <Button buttonName="Yes" buttonClicked={continueHandler} className={"yes"}></Button>
                            </div>

                        </div>
                    </Modal>}
            </div>
        </div>
    )
}

export default Home;