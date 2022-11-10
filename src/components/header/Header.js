import React from "react";
import { NavLink } from "react-router-dom";
import { routeConstants } from "../../constants/routeConstants";
import logo from "../../resources/logo.png";
import "./Header.scss";


/**
 * header component for all the website headers
 */
class Header extends React.Component{

    /**
     * navigating the user back to home page onclick of logo
     */
    logoClicked=()=>{
        this.props.goToHomeScreen();
    }

    render()
    {
        return(
            <div className="header">
                      <NavLink to={`${routeConstants.men}`} ><img src={logo} alt="logo" onClick={this.logoClicked}></img></NavLink> 
            </div>
        )
    }
}

export default Header;