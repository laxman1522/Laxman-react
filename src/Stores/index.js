import { configureStore } from "@reduxjs/toolkit";
import { blogDetailsReducer } from "./Slices/blogDetails";
import { blogReducer } from "./Slices/blogSlice";
import {updateSearch, updateTypes} from "./Slices/blogSlice";
import { updateblogDetails } from "./Slices/blogDetails";
import { userDetailsReducer, updateModalState } from "./Slices/userDetails";

export const store = configureStore({
    reducer: {
        blogs:  blogReducer,
        blogDetails: blogDetailsReducer,
        userDetails: userDetailsReducer
    }
})


export * from "./thunks/fetchBlogs"
export {updateSearch, updateblogDetails,updateModalState, updateTypes}