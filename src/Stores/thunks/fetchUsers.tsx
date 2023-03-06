import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiConstants } from "../../Constants/apiConstants";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get(ApiConstants.users);
    return response.data;
});

export {fetchUsers}


