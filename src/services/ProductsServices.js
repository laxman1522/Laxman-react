import api from "./api/Api";
import { urlConstants } from "../constants/urlConstants";

export const ProductsService={

    addedItems:[],

    async getItems(categoryId){
        const items=await api.get(`${urlConstants.shop}/${categoryId}`);
        return items.data;
    }
}
