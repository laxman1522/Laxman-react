import axios from "axios";
import { UrlConstants } from "../../constants/urlConstants";

export default axios.create({
    baseURL:UrlConstants.BaseUrl
})