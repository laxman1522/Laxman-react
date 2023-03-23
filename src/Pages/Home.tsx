import "./Home.scss";
import React, { useCallback, useState } from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";
import Modal from "../Components/Modal/modal";
import UserList from "../Components/UserList/userList";
import AddBlogs from "../Components/AddBlog/addBlog";
import { useDispatch } from "react-redux";
import { updateBlogDetails } from "../Stores";
import { AppConstants } from "../Constants/appConstants";
import { ApiConstants } from "../Constants/apiConstants";
import axios from "axios";
import ModalWarning from "../Components/modalWarning/modalWarning";

const Home = () => {

    const [selectedBlog, setSelectedBlog] = useState<any>();
    const [modal, setModal] = useState<any>('');
    const [loading, setLoading] = useState<any>(false);
    const [userList, setUserList] = useState<any>([]);
     //INFO: using useDispatch to dispatch actions to redux stores
     const dispatch = useDispatch<any>();

     const {CONFIRM, PRIMARY_BUTTON, SECONDARY_BUTTON, MODALS} = AppConstants;

     //INFO: For showing the warning modal if user tries to update the different blog details while editing the blog details
    const warningModalHandler = (selectedBlog: any) => {
        setSelectedBlog(selectedBlog);
        setModal(MODALS.WARNING_MODAL)
    }

    //INFO: For closing the modal on backdrop
    const toggleModal = useCallback(() => {
        setModal('');
    },[])

    //INFO: For closing the warning modal and updating the blog details if the user clicks continue in the warning pop up
    const continueHandler = () => {
        dispatch(updateBlogDetails(selectedBlog.title))
        setModal('');
    }

    //INFO: For taking the user back to the edit mode once the user clicks cancel in the warning pop up
    const cancelHandler = () => {
        setModal('');
    }

    //INFO: For showing the user modal once the user clicks the view members button
    const showMembersModal = useCallback(async () => {
            setModal(MODALS.USER_MODAL);
            if( userList.length ===0 ) {
                setLoading(true);
                const response = await axios.get(ApiConstants.users);
                setUserList(response.data);
                setLoading(false);
            }
    },[userList])

    //INFO: For showing the Add Blog form to the user once the user clicks the new button in the blog list container
    const addBlogModalHandler = useCallback(() => {
        setModal(MODALS.NEW_BLOG)
    },[])

    return (
        <div className="home-container d-flex">
            <SideBar showMembersModal={showMembersModal}></SideBar>
            <BlogList showWarningModal={warningModalHandler} showAddBlogModal={addBlogModalHandler}></BlogList>
            <BlogDescription></BlogDescription>
            <div className="user-modal">
            {modal === MODALS.USER_MODAL && <Modal toggleModal={toggleModal}>
                {loading ? <div className="loader"></div> : 
                <UserList userData = {userList}></UserList>}
            </Modal> }
            </div>
            <div className="new-blog-modal">
            {modal === MODALS.NEW_BLOG && <Modal toggleModal={toggleModal}>
                <AddBlogs toggleModal={toggleModal}></AddBlogs>
            </Modal> }
            </div>
            <div className="warning-pop-up">
                {modal === MODALS.WARNING_MODAL && <Modal toggleModal={toggleModal}>
                        <ModalWarning message={CONFIRM} allow={continueHandler} cancel={cancelHandler} primaryButton={PRIMARY_BUTTON}
                        secondaryButton={SECONDARY_BUTTON}></ModalWarning>
                    </Modal>}
            </div>
        </div>
    )
}

export default Home;