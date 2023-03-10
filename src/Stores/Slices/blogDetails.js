import {createSlice} from "@reduxjs/toolkit";

const blogDetails = createSlice({
    name:"blogDetails",
    initialState: {
        data: {},
        allowEdit: false
    },
    reducers: {
        updateblogDetails(state, action) {
            state.data = action.payload
            state.allowEdit = false
        },
        updateEditStatus(state,action) {
            state.allowEdit = action.payload
        },
    }
})


export const blogDetailsReducer = blogDetails.reducer;

export const {updateblogDetails, updateEditStatus} = blogDetails.actions;