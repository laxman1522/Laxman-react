import "./Cart.scss";
import React, { useEffect, useState } from "react"
import { AppConstants } from "../../constants/appConstants";
import CartCard from "../cartCard/CartCard";
import Button from "../button/Button";


/**
 *  component responsible for showing the items in the cart and wishlist 
 */
const Cart = (props) => {

    const {MyCart,MyWishlist,PlaceOrder,TotalAmount} = AppConstants;
    const [addedItems,setAddedItems] = useState([]);
    const [selectedMenu,setSelectedMenu] = useState("cart");
    const [wishlistItems,setWishlistItems] = useState([]);
    const [showWishlist,setShowWishlist] = useState(false);
    const [isCartEmpty,setIsCartEmpty] = useState(true);
    const [disabled,setDisabled] = useState(true);
    const [totalAmount,setTotalAmount] = useState(0);

    const localStorageItems = () => {
        let amount = 0;
        setTotalAmount(0)
        let keys =Object.keys(localStorage)
        keys.length === 0 && props.itemDeleted();
        for(let key of keys)
        {
            if(!key.includes("wishlist"))
            {
                setIsCartEmpty(false);
                setDisabled(false);
                amount = amount + JSON.parse(localStorage.getItem(key)).price * JSON.parse(localStorage.getItem(key)).count;
                amount === 0 && setDisabled(true);
                amount > 0 && setDisabled(false);
                setTotalAmount(amount);
                setAddedItems(addedItems=>[...addedItems,JSON.parse(localStorage.getItem(key))]);
            }
            else {
                setWishlistItems(wishlistItems=>[...wishlistItems,JSON.parse(localStorage.getItem(key))]);
            }
        }
    }
    
    useEffect(()=>{
        setAddedItems([]);
        setWishlistItems([]);
        localStorageItems();  
    },[props.addedItem,props.wishlistItem])

    useEffect(() => {
        if((props.wishlistItem.length)!==0)
        { 
        setShowWishlist(true);
        setSelectedMenu("wishlist");
        }
    },[props.wishlistItem])

    useEffect(() => {
        if((props.addedItem.length)!==0)
        {
            setShowWishlist(false);
            setSelectedMenu("cart");
        }
    },[props.addedItem])

    const itemDeleted = () => {
        setWishlistItems([]);
        setAddedItems([]);
        setIsCartEmpty(true);
        setDisabled(true);
        localStorageItems();
        props.itemDeleted();
    }

    const itemAdded = (info) => {
        setAddedItems([]);
        setWishlistItems([]);
        setShowWishlist(false);
        setSelectedMenu("cart");
        localStorageItems();
        info === AppConstants.WishlistToCart && props.wishlistToCartHandler();
    }

    const showWishList = () => {
        setSelectedMenu("wishlist");
        setShowWishlist(true);
    }

    const showCart = () => {
        setSelectedMenu("cart");
        setShowWishlist(false);
    }


   const items = addedItems.map((item)=>{
        return <CartCard key={item.id} cartItem={item} itemDeleted = {itemDeleted} itemAdded = {itemAdded}/>
    })

    const wishlist = wishlistItems.map((item)=>{
        return <CartCard key={`wishlist${item.id}`} cartItem={item} wishlistToCartHandler = {itemAdded} />
    })


    return (
        <div className="cart-container">
            <div className="cart-items">
                <div className="cart-wishlist">
                    <div className={"my-cart " + (selectedMenu==="cart"?"active":"")} onClick={showCart} >{MyCart}</div>
                    <div className={"my-wishlist " + (selectedMenu==="wishlist"?"active":"") } onClick={showWishList}>{MyWishlist}</div>
                </div>
                <div className="items-container">
                    {(isCartEmpty && !showWishlist) && <div className="empty-cart">You Cart is empty</div>}
                    {!showWishlist && items}
                    {showWishlist && wishlist}
                </div>
            </div>
            {!showWishlist && 
            <div className="footer">
                <div className="total">
                    <div className="total-amount-text">{TotalAmount}</div>
                    <div className="amount"><i className="fas fa-rupee-sign">&nbsp;</i>{totalAmount}</div>
                </div>
                <Button buttonName = {PlaceOrder} disabled={disabled}/>
            </div>}
        </div>
    )
}

export default Cart;