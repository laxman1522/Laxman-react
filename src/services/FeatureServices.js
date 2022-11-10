import { urlConstants } from "../constants/urlConstants";
import api from "./Api";

export const FeatureService={

    async getAllFeatures(){
        const features=await api.get(urlConstants.features);
        return features.data;
    }
}