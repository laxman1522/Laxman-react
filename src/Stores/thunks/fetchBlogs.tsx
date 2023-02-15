import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchBlogs = createAsyncThunk('blogs/fetch', async () => {
    const response = await axios.get('https://jsonmockserver.vercel.app/api/blogs');
    return response.data;
});

export {fetchBlogs}