import api from "../Api";
import { UrlConstants } from "../../constants/urlConstants";

export const productCategoriesService = {

    async getAllProductCategory () {
        const productCatgeory = await api.get(UrlConstants.Categories);
        return productCatgeory.data;
    }
}