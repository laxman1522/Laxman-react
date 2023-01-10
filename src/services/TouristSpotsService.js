import axios from "axios";
import { UrlConstants } from "../constants/urlConstants";

export const TouristSpotsService = {
    
    async getTouristSpots() {
        const touristSpots = await axios.get(UrlConstants.TOURIST_SPOTS_URL);
        return touristSpots.data;
    }
}