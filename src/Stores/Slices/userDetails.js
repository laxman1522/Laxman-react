import {createSlice} from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";


const userDetails = createSlice({
    name:"users",
    initialState: {
        isLoading: false,
        data: [],
        error:null,
        isModalOpen: false
    },
    reducers: {
        updateModalState(state, action) {
            state.isModalOpen = state.isModalOpen ? false : true;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isModalOpen = true;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})


export const userDetailsReducer = userDetails.reducer;

export const {updateModalState} = userDetails.actions;