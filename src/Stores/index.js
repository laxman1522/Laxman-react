import { configureStore } from "@reduxjs/toolkit";
import { blogDetailsReducer } from "./Slices/blogDetails";
import { blogReducer } from "./Slices/blogSlice";
import {updateSearch, updateTypes, addBlogDetails, updateBlogData} from "./Slices/blogSlice";
import { updateblogDetails, updateEditStatus } from "./Slices/blogDetails";


export const store = configureStore({
    reducer: {
        blogs:  blogReducer,
        blogDetails: blogDetailsReducer,
    }
})


export * from "./thunks/fetchBlogs"
export {updateSearch, updateblogDetails, updateTypes,addBlogDetails, updateBlogData , updateEditStatus}