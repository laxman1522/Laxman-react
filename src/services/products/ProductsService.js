import api from "../Api";
import { UrlConstants } from "../../constants/urlConstants";

export const ProductService = {

    async getAllProducts (categoryId) {
        const products = await api.get(`${UrlConstants.Products}${categoryId}`);
        return products.data;
    }
}

export default ProductService;