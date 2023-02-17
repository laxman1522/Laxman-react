import {createSlice} from "@reduxjs/toolkit";
import { fetchBlogs } from "../thunks/fetchBlogs";


const blogSlice = createSlice({
    name:"blog",
    initialState: {
        isLoading: false,
        blogData: [],
        error:null,
        searchTerm:"",
        types: []
    },
    reducers: {
        updateSearch(state, action) {
            state.searchTerm = action.payload
        },
        updateTypes(state, action) {
            state.types = action.payload
        },
        addBlogDetails(state, action) {
            state.blogData = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogData = action.payload;
        });
        builder.addCase(fetchBlogs.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})


export const blogReducer = blogSlice.reducer;

export const {updateSearch, updateTypes, addBlogDetails} = blogSlice.actions;