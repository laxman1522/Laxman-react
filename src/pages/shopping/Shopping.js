import "./Shopping.scss";
import React, { useState } from "react";
import Header from "../../component/header/Header";
import Product from "../../component/products/Products";
import Cart from "../../component/cart/Cart";

/**
 * 
 * @returns Shopping page - responsible for showing all the available products based on the category user selected
 */
const Shopping = () => {

    const [addedItem,setAddedItem] = useState([]);
    const [wishlistItem,setWishlistItem] = useState([]);

    const [isCartEmpty,setIsCartEmpty] = useState(Object.keys(localStorage).length===0 ? true : false);

    const itemAdded = (item) => {
            setIsCartEmpty(false);
            setAddedItem(item);
    }

    const itemWishlisted = (item) => {
            setIsCartEmpty(false);
            setWishlistItem(item);
    }

     const itemDeleted = () => {
        Object.keys(localStorage).length===0 && setIsCartEmpty(true);
        !localStorage.getItem(addedItem.id) && setAddedItem([]);
     }

     const wishlistToCart = () => {
        setWishlistItem([]);
     }
        
    return (
        <React.Fragment>
            <Header/>
            <div className="products-cart-container">
                <Product itemAddedHandler = {itemAdded} itemWishListed = {itemWishlisted}/>
                {!isCartEmpty && <Cart addedItem = {addedItem} wishlistItem = {wishlistItem} itemDeleted = {itemDeleted} wishlistToCartHandler = {wishlistToCart} />}
            </div>
        </React.Fragment>
    )
}

export default Shopping;