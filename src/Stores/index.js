import { configureStore } from "@reduxjs/toolkit";
import { blogDetailsReducer } from "./Slices/blogDetails";
import { blogReducer } from "./Slices/blogSlice";
import {updateSearch, updateTypes} from "./Slices/blogSlice";
import { updateblogDetails } from "./Slices/blogDetails";

export const store = configureStore({
    reducer: {
        blogs:  blogReducer,
        blogDetails: blogDetailsReducer
    }
})


export * from "./thunks/fetchBlogs"
export {updateSearch, updateblogDetails, updateTypes}