import "./CartCard.scss";
import Button from "../button/Button";
import { useState } from "react";
import { AppConstants } from "../../constants/appConstants";
import  PropTypes from "prop-types";
import fakeImg from "../../resources/fakeImg.jpeg";

/**
 * Cart Card component responsible for showing individual cart item & wishlist item details
 */
const CartCard = (props) => {

    const {name,photo,price,id,count,cart} = props.cartItem;

    const [item,setItem] = useState(props.cartItem);

    const deleteItemHandler = () => {
            if(count > 1)
            {
                localStorage.removeItem(id);
                props.cartItem.count = props.cartItem.count - 1;
                localStorage.setItem(id,JSON.stringify(props.cartItem));
                props.itemDeleted();
            }
            else {
                localStorage.removeItem(id);
                setItem([]);
                props.itemDeleted();
            }
            
    }

    const addItemHandler = () => {
                localStorage.removeItem(id);
                props.cartItem.count = props.cartItem.count + 1;
                localStorage.setItem(id,JSON.stringify(props.cartItem));
                setItem(JSON.parse(localStorage.getItem(id)));
                props.itemAdded();
    }

    const addToCartHandler = () => {
        localStorage.removeItem(`wishlist${id}`);
        props.cartItem.cart = true;
        props.cartItem.count = (JSON.parse(localStorage.getItem(id))?.count || 0) + 1;
        localStorage.setItem(id,JSON.stringify(props.cartItem));
        setItem(JSON.parse(localStorage.getItem(id)));
        props.wishlistToCartHandler(AppConstants.WishlistToCart);
        console.log(props.cartItem,JSON.parse(localStorage.getItem(id))?.count);
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