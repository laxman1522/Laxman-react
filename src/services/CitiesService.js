import axios from "axios";
import { UrlConstants } from "../constants/urlConstants";

export const CitiesService = {
    
    async fetchCities() {
        const cities = await axios.get(UrlConstants.CITIES_URL);
        return cities.data;
    }
}