import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('https://jsonmockserver.vercel.app/api/users');
    return response.data;
});

export {fetchUsers}