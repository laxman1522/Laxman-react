import {createSlice} from "@reduxjs/toolkit";


const blogDetails = createSlice({
    name:"blogDetails",
    initialState: {
        data: {},
    },
    reducers: {
        updateblogDetails(state, action) {
            state.data = action.payload
        }
    },
})


export const blogDetailsReducer = blogDetails.reducer;

export const {updateblogDetails} = blogDetails.actions;