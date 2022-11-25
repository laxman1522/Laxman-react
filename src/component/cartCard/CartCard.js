import Button from "../button/Button";
import { useState } from "react";
import { AppConstants } from "../../constants/appConstants";
import  PropTypes from "prop-types";
import fakeImg from "../../resources/fakeImg.jpeg";

/**
 * Cart Card component responsible for showing individual cart item & wishlist item details
 */
const CartCard = (props) => {

    const {cartItem,itemDeleted,itemAdded,wishlistToCartHandler} = props;
    const {name,photo,price,id,count,cart} = cartItem;
    const [item,setItem] = useState(cartItem);

    const deleteItemHandler = () => {
            localStorage.removeItem(id);
            if(count > 1)
            {
                cartItem.count = cartItem.count - 1;
                localStorage.setItem(id,JSON.stringify(cartItem));
                itemDeleted();
            }
            else {
                setItem([]);
                itemDeleted();
            }
            
    }

    const addItemHandler = () => {
                localStorage.removeItem(id);
                cartItem.count = cartItem.count + 1;
                localStorage.setItem(id,JSON.stringify(cartItem));
                setItem(JSON.parse(localStorage.getItem(id)));
                itemAdded();
    }

    const addToCartHandler = () => {
        localStorage.removeItem(`wishlist${id}`);
        cartItem.cart = true;
        cartItem.count = (JSON.parse(localStorage.getItem(id))?.count || 0) + 1;
        localStorage.setItem(id,JSON.stringify(cartItem));
        setItem(JSON.parse(localStorage.getItem(id)));
        wishlistToCartHandler(AppConstants.WishlistToCart);
    }

    return(
        <div className="cart-card">
            <img src={photo} alt={name}></img>
            <div className="name-price">
                <div className="item-name">{name}</div>
                <div className="price"><i className="fas fa-rupee-sign">&nbsp;</i>{price}</div>
            </div>
            {cart && 
            <div className="add-delete">
                <div className="delete" onClick={deleteItemHandler}>{AppConstants.Delete}</div>
                <div className="count">{count}</div>
                <div className="add" onClick={addItemHandler}>{AppConstants.Add}</div>
            </div>}
            {!cart && <Button buttonName = {AppConstants.AddToCart} buttonClickHandler= {addToCartHandler}/>}
        </div>
    )
}

const {Nil} = AppConstants;

CartCard.propTypes={
    name:PropTypes.string,
    photo:PropTypes.string,
    price:PropTypes.string,
    id:PropTypes.string,
    cart:PropTypes.bool
}

CartCard.defaultProps={
    name:Nil,
    photo:fakeImg,
    price:Nil,
    id:"",
    cart:true
}

export default CartCard;