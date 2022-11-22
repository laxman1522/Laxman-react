import "./ProductCategories.scss";
import React, { useEffect, useState } from "react";
import { AppConstants } from "../../constants/appConstants";
import { productCategoriesService } from "../../services/productCategories/ProductCategoriesService";
import Category from "../category/Category";
import Loader from "../loader/Loader";


/**
 * 
 * @returns product category component - responsible for showing all the available product category.
 */
const ProductCategories = () => {

    const {YourHomeWithLove,ComeChoose} = AppConstants;
    const [productCategories,setProductCategories] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect (() => {

        const getProductCategory = async () => {
            const productCategory = await productCategoriesService.getAllProductCategory();
            setProductCategories(productCategory);
            setLoading(false);
        }
        getProductCategory();
    },[])


    const categories = productCategories.map((category) => {
        return <Category key = {category.id} category = {category}/>
    })


    return (
        <div className="product-category-container">
            <div className="your-home">{YourHomeWithLove}</div>
            <div className="come-choose">{ComeChoose}</div>
            {loading && 
            <div className="spinner">
                <Loader/>
            </div>}
            <div className="categories-card-container">
                    {categories}
            </div>
        </div>
    )
}

export default ProductCategories;
