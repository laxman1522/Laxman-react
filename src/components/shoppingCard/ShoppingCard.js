import "./ShoppingCard.scss";
import React from "react";
import { appConstants } from "../../constants/appConstants";
import Button from "../button/Button";
import PropTypes from 'prop-types';
import fakeImg from "../../resources/fakeImg.jpeg"


/**
 * shopping card component which is responsible for showing individual items in the card format
 */
class  ShoppingCard extends React.Component{

    state={disableButton:false};

    componentDidMount(){
        if(this.props.item.price=="")
        {
            this.cardRef.current.classList.add("unclear-details");
            this.setState({disableButton:true});
        }
    }

    imageRef=React.createRef();
    cardRef=React.createRef();

    /**
     * passing the added item to the parent once user clicks add to bag
     */
    itemAdded=()=>{
        this.props.itemsAdded(this.props.item);
    }

    /**
     * replacing the image url if the url from api is not valid
     */
    replaceImageUrl=()=>{
        this.imageRef.current.src=fakeImg;
        this.cardRef.current.classList.add("unclear-details");
        this.setState({disableButton:true});
    }

    render() {

            const {name,image,price}=this.props.item;
            const {smallSize,mediumSize,largeSize,wishlist,addToBag}=appConstants

            return(
                <div ref={this.cardRef} className="item-details-card">
                    <img ref={this.imageRef} src={image} onError={this.replaceImageUrl} alt={name}></img>
                    <div className="item-details">
                        <div className="item-name">{name}</div>
                        <div className="price-size">
                            <div className="price">{price || "Nil"}</div>
                            <div className="sizes">
                                <div>{smallSize},<span></span></div>
                                <div> {mediumSize},</div>
                                <div>{largeSize}</div>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button className={"grey-button"} buttonName={wishlist}/>
                            <Button  buttonName={addToBag} disableButton={this.state.disableButton} buttonClicked={this.itemAdded}></Button>
                        </div>
                    </div>        
                </div>
            )
    }
} 

ShoppingCard.propTypes = {
    item:PropTypes.shape({
        name:PropTypes.string,
        image:PropTypes.string,
        price:PropTypes.string
    })
}

ShoppingCard.defaultProps = {
    item:{
        name:"no item",
        image:appConstants.imageNotFound,
        price:"$ 0"
    }
}

export default ShoppingCard;