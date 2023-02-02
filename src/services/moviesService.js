import React from "react";
import axios from "axios";
import { UrlConstants } from "../constants/urlConstants";

export const MovieService = {

   async getMovies() {
        const movies = await axios.get(UrlConstants.MOVIES_URL)

        return movies.data;
    }
}