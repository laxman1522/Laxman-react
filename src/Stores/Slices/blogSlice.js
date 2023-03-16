import {createSlice} from "@reduxjs/toolkit";
import { fetchBlogs } from "../thunks/fetchBlogs";

const blogSlice = createSlice({
    name:"blog",
    initialState: {
        isLoading: false,
        blogData: [],
        error:null,
        searchTerm:"",
        types: [],
        blogAdded: false
    },
    reducers: {
        updateSearch(state, action) {
            state.searchTerm = action.payload
        },
        updateTypes(state, action) {
            state.types = action.payload
            const blogData = state.blogData.map((blog, index) => {
                return {...blog, selected: false}
            })
            state.blogData = blogData;
        },
        addBlogDetails(state, action) {
            state.blogData = action.payload;
            state.blogAdded = true
        },
        updateBlogData(state,action) {
            state.blogData = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            const blogData = action.payload.map((blog, index) => {
                return index === 0 ? {...blog, selected:true} : {...blog, selected: false}
            })
            state.blogData = blogData
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

export const {updateSearch, updateTypes, addBlogDetails, updateBlogData} = blogSlice.actions;