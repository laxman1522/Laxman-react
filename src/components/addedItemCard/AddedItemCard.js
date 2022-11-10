import "./AddedItemCard.scss"
import { appConstants } from "../../constants/appConstants";
import PropTypes from "prop-types";


/**
 * Added item card - component which is responsible for showing the individual added item in the card format
 */
const AddedItemCard=(props)=>{

    const {name,image,price}=props.item;
    const {remove}=appConstants;

    return(
        <div className="card-container">
            <div className="item-details">
                <img src={image} alt={name}></img>
                <div className="name-price">
                    <div className="name">{name}</div>
                    <div className="price">{price}</div>
                </div>
                <div className="remove">{remove}</div>
            </div>
        </div>
    )
}

AddedItemCard.propTypes={
    name:PropTypes.string,
    image:PropTypes.string,
    price:PropTypes.string
}

AddedItemCard.defaultProps = {
    name:"no item",
    image:appConstants.imageNotFound,
    price:"$ 0"
}

export default AddedItemCard;