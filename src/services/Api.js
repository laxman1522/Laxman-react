import axios from "axios";
import { urlConstants } from "../constants/urlConstants";

export default axios.create({
    baseURL:urlConstants.nijinserver
})