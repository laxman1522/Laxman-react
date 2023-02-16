import "./Home.scss";
import React from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";
import Modal from "../Components/Modal/modal";
import { useSelector } from "react-redux";

const Home = () => {

    const {isLoading, data, error, isModalOpen} = useSelector((state: any) => {
        return state.userDetails;
    })

    return (
        <div className="home-container d-flex">
            <SideBar></SideBar>
            <BlogList></BlogList>
            <BlogDescription></BlogDescription>
            {isModalOpen && <Modal></Modal> }
        </div>
    )
}

export default Home;