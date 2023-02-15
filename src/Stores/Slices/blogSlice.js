import {createSlice} from "@reduxjs/toolkit";
import { fetchBlogs } from "../thunks/fetchBlogs";


const blogSlice = createSlice({
    name:"blog",
    initialState: {
        isLoading: false,
        data: [],
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
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
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

export const {updateSearch, updateTypes} = blogSlice.actions;