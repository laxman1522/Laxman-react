import "./Home.scss";
import React from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";

const Home = () => {

    return (
        <div className="home-container d-flex">
            <SideBar></SideBar>
            <BlogList></BlogList>
            <BlogDescription></BlogDescription>
        </div>
    )
}

export default Home;