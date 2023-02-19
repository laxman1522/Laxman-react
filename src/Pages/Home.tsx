import "./Home.scss";
import React, { useCallback, useRef } from "react";
import SideBar from "../Containers/SideBar/sideBar";
import BlogList from "../Containers/BlogList/blogList";
import BlogDescription from "../Containers/BlogDescription/blogDescription";
import Modal from "../Components/Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../Components/UserCard/userCard";
import Button from "../Components/Button/button";
import { AppConstants } from "../Constants/appConstants";
import { addBlogDetails } from "../Stores";

const Home = () => {

    const blogTitleRef = useRef<any>();
    const blogDescriptionRef = useRef<any>();
    

    const dispatch = useDispatch<any>();

    const { data, isModalOpen, showBlogInputs} = useSelector((state: any) => {
        return state.userDetails;
    })

    const { blogData} = useSelector((state: any) => {
        return state.blogs;
    })

    const userList = data.map((data:any) => {
        return <UserCard key={data?.id} id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    const addBlogHandler = useCallback(() => {
        if(blogTitleRef.current.value && blogDescriptionRef.current.value) {
            const blogDetails = {
                type: "Local",
                title: blogTitleRef.current.value,
                photo: "https://w0.peakpx.com/wallpaper/751/685/HD-wallpaper-little-girl-girl-sleeping-books-lamp.jpg",
                details: blogDescriptionRef.current.value,
             };
             const blogs = [...blogData, blogDetails];
             dispatch(addBlogDetails(blogs));
        } else {
            alert("Please enter your value")
        }
    },[blogData])

    return (
        <div className="home-container d-flex">
            <SideBar></SideBar>
            <BlogList></BlogList>
            <BlogDescription></BlogDescription>
            {(isModalOpen && !showBlogInputs) && <Modal>
                <div className="modal-title">Members</div>
                <div className="users-container">
                    {userList}
                </div>
            </Modal> }
            {(isModalOpen && showBlogInputs) && <Modal>
                <div className="modal-title">Add New Blog</div>
                <div className="blog-input-content">
                <div className="blog-inputs">
                    <input ref={blogTitleRef} type="text" id="title" name="title" placeholder="Name Your Blog"></input>
                    <textarea ref={blogDescriptionRef} id="description" name="description" rows={3} cols={7} placeholder="Write your content here..."></textarea>
                </div>
                <Button buttonName={AppConstants.ADD} className={"add"} buttonClicked={addBlogHandler}></Button>
                </div>
            </Modal> }
        </div>
    )
}

export default Home;