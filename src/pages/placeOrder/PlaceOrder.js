import "./PlaceOrder.scss";
import React from "react";
import Header from "../../components/header/Header";
import FeaturesCard from "../../components/featuresCard/FeaturesCard";
import { FeatureService } from "../../services/FeatureServices";
import { appConstants } from "../../constants/appConstants";
import AddedItemCard from "../../components/addedItemCard/AddedItemCard";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import { routeConstants } from "../../constants/routeConstants";
import { NavLink } from "react-router-dom";


/**
 * place order page for showing the order details 
 */
class PlaceOrderPage extends React.Component{

    //state initialization
    state={featureList:[],features:[],orderedItems:[],loading:true};

    componentDidMount(){
        //fetching all the available features and updating it using setState
        FeatureService.getAllFeatures().then((response)=>{
            this.setState({featureList:response,loading:false});
            this.setState({features:(this.state.featureList.map((feature,index)=>{
                return <FeaturesCard key={Math.random()} feature={feature}/>
            }))})

        });

        //fetching the ordereditems from local storag
        const addedItems=JSON.parse(localStorage.getItem("items")) || [];

        //returning the AddedItemCard based on the no of added items
        this.setState({orderedItems:(addedItems.map((item,index)=>{
            return (
                <div className="order-item-card">
                    <AddedItemCard key={index} item={item}/>
                </div>
            )
        }))})
    }

    /**
     * removing the items once the order placed successfully
     */
    componentDidUpdate(){
        this.state.orderedItems.length && localStorage.removeItem("items");
    }

    /**
     * navigating the user back to the home page onClick of continue shopping button
     */
    shopNow=()=>{
        localStorage.removeItem("items");
     }

    render(){

        const {continueShopping,orderPlaced,successfullOrder,orderTrack,thankYou}=appConstants;

        return(
            <div className="place-order-main-container">
                <Header goToHomeScreen={this.shopNow}/>
                <div className="order-details-features-container">
                    {this.state.orderedItems.length!=0 && (
                    <div className="order-details-container">
                        <div className="order-placed">{orderPlaced}</div>
                        <div className="successfull-order">{successfullOrder}</div>
                        <div className="order-track">{orderTrack}</div>
                        <div className="thankyou">{thankYou}</div>
                        <div className="ordered-items">
                            {this.state.orderedItems}
                        </div>
                    </div>)}
                    {(this.state.orderedItems.length)==0 && (
                        <div className="no-items">
                            <div className="no-order">{appConstants.emptyCart}</div>
                        </div>
                    )}
                    {!this.state.loading && 
                        <div className="features-container">
                            {this.state.features}
                        </div>
                    }
                    {this.state.loading && <Loader/>}
                    <footer>
                        <NavLink to={`${routeConstants.men}`}><Button  buttonClicked={this.shopNow} buttonName={continueShopping}/></NavLink>
                    </footer>
                </div>
            </div>
        )
    }
}

export default PlaceOrderPage;