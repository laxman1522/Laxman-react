import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./Slices/blogSlice";
import {updateSearch, updateTypes, addBlogDetails,updateBlogDetails, updateBlogData, updateblogDetails, updateEditStatus, updateEditedBlogDetails} from "./Slices/blogSlice";


export const store = configureStore({
    reducer: {
        blogs:  blogReducer
    }
})


export * from "./thunks/fetchBlogs"
export {updateSearch, updateblogDetails,updateBlogDetails, updateTypes,addBlogDetails, updateBlogData , updateEditStatus, updateEditedBlogDetails}