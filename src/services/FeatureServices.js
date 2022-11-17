import { urlConstants } from "../constants/urlConstants";
import api from "./api/Api";

export const FeatureService={

    async getAllFeatures(){
        const features=await api.get(urlConstants.features);
        return features.data;
    }
}