import "./ShoppingCardContainer.scss";
import React from "react";
import ShoppingCard from "../shoppingCard/ShoppingCard";
import { appConstants } from "../../constants/appConstants";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";
import avatar from "../../resources/avatar.jpeg";


/**
 * shopping card container - component responsible for showing the items in the card format based on the selected category
 */
class ShoppingCardContainer extends React.Component{

    /**
     * passing the added item to the parent component
     */
    itemAdded=(event)=>{
        this.props.itemAdded(event);
    }
    
    shouldComponentUpdate(prevProps){
        return prevProps.items==this.props.items ? false : true;
    }

    render(){
        const {loading,category,items}=this.props;
        const {avatarName}=appConstants;

        const images=items.map((item)=>{
            return <ShoppingCard key={item.id} item={item} itemsAdded={this.itemAdded}/>
        })

        return(
                <div className="main-container">
                    <div className="user-details">
                        <div className="category">{category.toUpperCase()}</div>
                        <div className="user-avatar">
                        <div className="name">{avatarName}</div>
                        <img src={avatar} className="avatar" alt="avatar"></img>
                        </div>
                    </div>
                    {!loading && 
                    <div className="shopping-card-container">
                        {images}
                    </div>}
                    {loading && 
                        <div className="loader-container">
                            <Loader/>
                        </div>
                    }
                </div>
                
        )
            }
}

ShoppingCardContainer.propTypes={
    loading:PropTypes.bool,
    category:PropTypes.string,
    items:PropTypes.array
}

ShoppingCardContainer.defaultProps={
    loading:true
}

export default ShoppingCardContainer;