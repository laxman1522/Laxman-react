import "./ProductCard.scss";
import React from "react";
import { AppConstants } from "../../constants/appConstants";
import Button from "../button/Button";
import {useRef, useState} from "react";
import fakeImg from "../../resources/fakeImg.jpeg";
import shield from "../../resources/shield.jpeg";
import  PropTypes from "prop-types";

/**
 *  component responsible for showing individual product details
 */
const ProductCard = (props) => {

    const {product,itemAddedHandler,itemWishlisted,orderPage} = props;
    const {name,photo,price,description,guarantee,id,count} = props.product;
    const year = guarantee > 1 ? AppConstants.Years : AppConstants.Year;
    const {Guarantee,AddToWishlist,AddToCart,Quantity} = AppConstants;
    const imageRef = useRef();
    const cardRef = useRef();
    const [disabled,setDisabled] = useState(false);

    const invalidImageHandler = () => {
        imageRef.current.src = fakeImg;
        cardRef.current.classList.add("unclear-details");
        setDisabled(true);
    }

    const itemAdded = () => {
            if(localStorage.getItem(id))
                {
                    product.cart = true;
                    product.count = JSON.parse(localStorage.getItem(id)).count + 1;
                    localStorage.setItem(id,JSON.stringify(product));
                    itemAddedHandler(localStorage.getItem(id));
                }
                else {
                    product.cart = true;
                    product.count = 1;
                    localStorage.setItem(id,JSON.stringify(product));
                    itemAddedHandler(localStorage.getItem(id));
                }
        
    }

    const addToWishlist = () => {
        if(!disabled)
        {
            product.cart = false;
            product.wishlist = true;
            localStorage.setItem(`wishlist${product.id}`,JSON.stringify(product));
            itemWishlisted(product);
        }
    }

    return (
        <div className="product-card" ref={cardRef}>
            <img ref={imageRef} src={photo} onError={invalidImageHandler} alt={name}></img>
            <div className="name-price">
                <div className="name">{name}</div>
                <div className="price"><i className="fas fa-rupee-sign">&nbsp;</i>{price}</div>
            </div>
            {orderPage && <div className="quantity">{Quantity} : {count}</div>}
            <div className="description">{description}</div>
            {!orderPage && 
            <React.Fragment>
            <div className="guarantee">
                <img src={shield} alt="shield"/>{`${guarantee} ${year} ${Guarantee}`}
            </div>
            <div className="border"></div>
            <div className="buttons">
                <div className={`wishlist disabled${disabled}`} onClick={addToWishlist}>{AddToWishlist}</div>
                <Button buttonName = {AddToCart} buttonClickHandler = {itemAdded} disabled={disabled}/>
            </div>
            </React.Fragment>}
        </div>
    )
}

ProductCard.propTypes={
    product:PropTypes.object,
    name:PropTypes.string,
    photo:PropTypes.string,
    price:PropTypes.string,
    description:PropTypes.string,
    guarantee:PropTypes.string,
    id:PropTypes.string,
    orderPage:PropTypes.bool,
    count:PropTypes.number
}

ProductCard.defaultProps = {
    product:{},
    name:AppConstants.Nil,
    photo:fakeImg,
    price:AppConstants.Nil,
    description:AppConstants.FakeDescription,
    guarantee:AppConstants.Nil,
    id:"",
    orderPage:false,
    count:0
}

export default ProductCard;

