import "./Category.scss";
import React, { useRef } from "react";
import Button from "../button/Button";
import { AppConstants } from "../../constants/appConstants";
import { useNavigate } from "react-router-dom";
import  PropTypes from "prop-types";
import { Routes } from "../../constants/routeConstants";
import fakeImg from "../../resources/fakeImg.jpeg";


/**
 * 
 * @returns category component - responsible for showing individual product category details
 */
const Category = (props) => {

    const {category,description,photo} = props.category;

    const imgRef = useRef();

    const navigate = useNavigate();

    const shopNowHandler = () => {
        navigate(`${Routes.categories}/${category.toLowerCase()}`);
    }

    const invalidImageHandler = () => {
        imgRef.current.src = fakeImg;
    }

    return (
        <div className="category-card">
            <img ref={imgRef} src={photo} alt={category} onError={invalidImageHandler}></img>
            <div className="name">{category}</div>
            <div className="description">{description}</div>
            <Button buttonName={AppConstants.ShopNow} buttonClickHandler = {shopNowHandler}/>
        </div>
    )
}

Category.propTypes={
    category:PropTypes.object,
    description:PropTypes.string,
    photo:PropTypes.string
}

Category.defaultProps={
    category:"",
    description:"Nil",
    photo:fakeImg
}

export default Category;