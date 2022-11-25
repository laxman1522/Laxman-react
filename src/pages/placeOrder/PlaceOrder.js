import "./PlaceOrder.scss";
import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import ProductCategories from "../../component/productCategories/ProductCategories";
import { AppConstants } from "../../constants/appConstants";
import ProductCard from "../../component/productCard/ProductCard";
import Footer from "../../component/footer/Footer";

/**
 * 
 * @returns Place order page - responsible for showing the placed orders
 */
const PlaceOrder = () => {

    const {OrderConfirmation,ThankYouForShopping} = AppConstants;
    const [orderedItems,setOrderedItems] = useState([]);
    const [isOrderPlaced,setIsOrderPlaced] = useState(localStorage.getItem("orderPlaced") || false);

    useEffect(() => {
        setOrderedItems([]);
        let keys = Object.keys(localStorage)
        keys.length === 0 && setIsOrderPlaced(false);
        for(let key of keys)
        {
            if(!key.includes("wishlist") && !key.includes("orderPlaced"))
            {
                setIsOrderPlaced(true);
                setOrderedItems(orderedItems=>[...orderedItems,JSON.parse(localStorage.getItem(key))]);
            }        
        }
        return () => {
            if(orderedItems.length!==0)
            {
                let keys = Object.keys(localStorage);
                for(let key of keys)
                {
                    if(!key.includes("wishlist"))
                    {
                        localStorage.removeItem(key);
                    }        
                }
            }
        }
    },[isOrderPlaced])

    const items = orderedItems.map((item) => {
        return <ProductCard key={`order${item.id}`} product={item} orderPage={true} />
    })

    return (
        <React.Fragment>
            <Header/>
            <div className="order-details-container">
                <div className="order-details">
                    <div className="order-confirmation">{OrderConfirmation}</div>
                    <div className="thank-you">{ThankYouForShopping}</div>
                    <div className="orders">
                        {isOrderPlaced && [items]}
                        {!isOrderPlaced && <div className="no-orders">No Orders Available !!!</div>}
                    </div>
                </div>
            </div>
            <ProductCategories/>
            <Footer/>
        </React.Fragment>
    )
}

export default PlaceOrder;