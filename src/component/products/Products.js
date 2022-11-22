import "./Products.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductService from "../../services/products/ProductsService";
import ProductCard from "../productCard/ProductCard";
import Loader from "../loader/Loader";

const Product = (props) => {

    const {itemAddedHandler,itemWishListed} = props;
    const location = useLocation();
    const [productsList,setProductsList] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect (() => {

        const getProducts = async () => {
            setLoading(true);
            const products = await ProductService.getAllProducts(location.pathname.split("/")[2]);
            setProductsList(products);
            setLoading(false);
        }

        getProducts();

    },[location])

    const itemAdded = (item) => {
        itemAddedHandler(item);
    }

    const itemWishlisted = (item) => {
       itemWishListed(item);
    }

    const products = productsList.map((product) => {
       return <ProductCard key = {product.id} product = {product} itemAddedHandler = {itemAdded} itemWishlisted = {itemWishlisted}/>
    })

    return (
            <div className="products-container">
                {loading && 
                <div className="spinner">
                    <Loader/>
                </div>}      
            {!loading && [products]}
            </div>
    )
}

export default Product;