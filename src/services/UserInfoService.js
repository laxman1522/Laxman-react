import axios from "axios";
import { UrlConstants } from "../constants/urlConstants";

export const UserInfoService = {
    
    async loginInUser(userName,password) {
        const loginUser = await axios.get(UrlConstants.LOGINURL);
        for(const data of loginUser.data) {
            if(data.username === userName && data.password === password) {
                return data;
            }
        }
    }
}