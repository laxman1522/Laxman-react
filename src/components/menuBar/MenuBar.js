import "./MenuBar.scss";
import React from "react";
import logo from "../../resources/logo.png";
import { appConstants } from "../../constants/appConstants";
import { NavLink,Link } from "react-router-dom";
import { routeConstants } from "../../constants/routeConstants";


/**
 * menu bar component which is responsible for showing the available menu for the user to navigate
 */
class MenuBar extends React.Component{

    menuSelected=false;

    componentDidMount(){
        console.log("didmount1")
        this.menuSelected=true;
    }

    componentDidUpdate(){
        this.menuSelected=false;
    }

    shouldComponentUpdate(){
        return !(this.menuSelected)
    }

    /**
     * 
     * Passing the data to parent based on the selected category & adding class to the the selected category
     */
    category = (event) => {
        if(event.target.localName=="img")
        {
            this.props.categorySelected("men");
        }
        else{
            this.props.categorySelected(event.target.innerText.toLowerCase());
        }
    }

    render(){

        const {menuMen,menuWomen,menuKids,menuAbout}=appConstants;

        return(
            <div className="menu-container">
                <div className="logo">
                    <NavLink to={`${routeConstants.home}men`}><img src={logo} onClick={this.category} alt="logo"></img></NavLink>  
                </div>
                <div className="menu-options">
                    <NavLink to={`${routeConstants.home}men`}  onClick={this.category}>{menuMen}</NavLink>
                    <NavLink to={`${routeConstants.home}women`}  onClick={this.category}>{menuWomen}</NavLink>
                    <NavLink to={`${routeConstants.home}kids`}  onClick={this.category}>{menuKids}</NavLink>
                </div>
                <div className="about-us">
                    <Link to="/aboutus" className="about-us-text">{menuAbout}</Link>
                </div>
            </div>
        )
    }
}

export default MenuBar;