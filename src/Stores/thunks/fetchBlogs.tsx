import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiConstants } from "../../Constants/apiConstants";

const fetchBlogs = createAsyncThunk('blogs/fetch', async () => {
    const response = await axios.get(ApiConstants.blogs);
    return response.data;
});

export {fetchBlogs}