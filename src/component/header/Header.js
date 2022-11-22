import "./Header.scss";
import React from "react";
import { AppConstants } from "../../constants/appConstants";
import { NavLink,Link } from "react-router-dom";
import { Routes } from "../../constants/routeConstants";

/**
 * Header component responsible for showing all the available menu options 
 */
const Header = () => {

    const {ShopName,Chairs,Couches,Dining,UserName} = AppConstants;

    return(
        <div className="header-container">
            <div className="header-items">
                <Link to={Routes.Home} className="shop-name">{ShopName}</Link>
                <div className="categories">
                    <NavLink to={Routes.Couches}>{Couches}</NavLink>
                    <NavLink to={Routes.Chairs}>{Chairs}</NavLink>
                    <NavLink to={Routes.Dining}>{Dining}</NavLink>
                </div>
                <div className="user-dropdown">
                    <div className="user-name">{UserName}</div>
                    <i className='fas fa-caret-down'></i>
                </div>
            </div>
        </div>
    )
}


export default Header;