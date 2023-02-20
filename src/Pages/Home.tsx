import "./Home.scss";
import React from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";
import Modal from "../Components/Modal/modal";
import UserList from "../Components/UserList/userList";
import AddBlogs from "../Components/AddBlog/addBlog";
import { useSelector } from "react-redux";

const Home = () => {

    //INFO: destructuring the user details from the redux store/userDetails
    const { isModalOpen, showBlogInputs} = useSelector((state: any) => {
        return state.userDetails;
    })

    return (
        <div className="home-container d-flex">
            <SideBar></SideBar>
            <BlogList></BlogList>
            <BlogDescription></BlogDescription>
            {(isModalOpen && !showBlogInputs) && <Modal>
                <UserList></UserList>
            </Modal> }
            {(isModalOpen && showBlogInputs) && <Modal>
                <AddBlogs></AddBlogs>
            </Modal> }
        </div>
    )
}

export default Home;