import {createSlice} from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addBlogDetails } from "./blogSlice";


const userDetails = createSlice({
    name:"users",
    initialState: {
        isLoading: false,
        data: [],
        error:null,
        isModalOpen: false,
        viewMembers: false,
        showBlogInputs: false
    },
    reducers: {
        updateModalState(state, action) {
            state.isModalOpen = state.isModalOpen ? false : true;
            state.viewMembers = false;
            state.showBlogInputs = false;
        },
        updateViewMembers(state,action) {
            state.showBlogInputs = false;
            state.viewMembers = state.viewMembers ? false : true;
            state.isModalOpen = state.isModalOpen ? false : true;
        },
        updateBlogInputs(state, action) {
            state.showBlogInputs = state.showBlogInputs ? false : true;
            state.viewMembers = false;
            state.isModalOpen = state.isModalOpen ? false : true;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.viewMembers = true;
        });
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
            state.showBlogInputs = false;
            state.isModalOpen = true;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(addBlogDetails, (state,action) => {
            state.isModalOpen = false;
            state.viewMembers = false;
            state.showBlogInputs = false;
        })
    }
})


export const userDetailsReducer = userDetails.reducer;

export const {updateModalState, updateViewMembers, updateBlogInputs} = userDetails.actions;