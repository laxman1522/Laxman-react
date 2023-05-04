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
        blogAdded: false,
        blogDetails: {},
        allowEdit: false
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
            const {updatedTypes, CUSTOM_TYPE, blogTitle, blogDescription, CUSTOM_IMAGE} = action.payload;
            const blogData = state.blogData;
            const updatedBlogData = [];
             const blogDetails = {
                 type: CUSTOM_TYPE,
                 title: blogTitle,
                 photo: CUSTOM_IMAGE,
                 selected: true,
                 details: blogDescription,
              };
              updatedBlogData.push(blogDetails);
              for(let blogs of blogData) {
                    updatedBlogData.push({...blogs, selected: false})
              }
              state.blogData = updatedBlogData;
              state.blogDetails = blogDetails;
              state.blogAdded = true;
              state.types = updatedTypes;
        },
        updateblogDetails(state, action) {
            state.blogDetails = action.payload
        },
        updateBlogDetails(state, action) {
            const title = action.payload
            const blogData = state.blogData;
            for(let blog of blogData) {
                if(blog.title === title) {
                    state.blogDetails = blog;
                }
            }
            state.allowEdit = false;
        },
        updateEditStatus(state,action) {
            state.allowEdit = action.payload
        },
        updateEditedBlogDetails(state,action) {
            const blogData = state.blogData;
            const {title,titleDefaultValue,description } = action.payload;
            const blogDetails = state.blogDetails;
            let updatedBlogDetails = {};
            let updatedBlogData = [];
            for(let blogs of blogData ) {
                if((blogs.title === titleDefaultValue) && ((title !== blogDetails.title) || (description !== blogDetails.details))) {
                    updatedBlogDetails = {
                        title: title,
                        photo: blogs.photo,
                        details: description,
                        selected: true,
                        type: blogs.type,
                    }
                    updatedBlogData.push(updatedBlogDetails)
                } else {
                    updatedBlogData.push({...blogs, selected: false});
                }
            }
            if(updatedBlogDetails) {
                state.blogDetails = updatedBlogDetails;
                state.blogData = updatedBlogData;
            }
            state.allowEdit = false; 
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            const blogData = action.payload.map((blog, index) => {
                return index === 0 ? {...blog, selected:true} : {...blog, selected: false}
            })
            const uniqueTypes = action.payload.map((data) => data.type.toLowerCase()).filter((value,index,array) => array.indexOf(value) === index);
            state.types = uniqueTypes;
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

export const {updateSearch, updateTypes, addBlogDetails,updateBlogDetails, updateblogDetails, updateEditStatus, updateEditedBlogDetails} = blogSlice.actions;
