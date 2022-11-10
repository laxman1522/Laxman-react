import "./Cart.scss";
import { appConstants } from "../../constants/appConstants";
import AddedItemCard from "../addedItemCard/AddedItemCard";
import Button from "../button/Button";
import  PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

/**
 * cart component for showing the added items & the count
 */
const Cart=(props)=>{

    const {addedItems,cartCount,disableButton}=props;
    const {myCart}=appConstants;

    const items=addedItems?.map((item)=>{
        return <AddedItemCard key={Math.random()} item={item} />
    })

    /**
     * passing the data to parent once the order got placed
     */
    const orderPlaced=()=>{
        props.orderPlaced();
    }

    return(
        <div className="cart-container">
            <div className="my-cart">{myCart} ({cartCount})</div>
            <div className="added-items">
                {items}
            </div>
            <NavLink to="/placeorder">
                <Button disableButton={disableButton} buttonName={"PLACE ORDER"} buttonClicked={orderPlaced}/>
            </NavLink>
        </div>
    )
}

Cart.propTypes={
    addedItems:PropTypes.array,
    cartCount:PropTypes.number,
    disableButton:PropTypes.bool
}

Cart.defaultProps={
    addedItems:[],
    cartCount:0,
    disableButton:true
}

export default Cart;