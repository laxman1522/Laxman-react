import  "./AboutUs.scss";
import React from "react";
import aboutTopBanner from "../../resources/about-top-banner.png"
import aboutMiddleBanner from "../../resources/about-middle-banner.png"
import FeaturesCard from "../../components/featuresCard/FeaturesCard";
import { FeatureService } from "../../services/FeatureServices";
import { appConstants } from "../../constants/appConstants";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import { routeConstants } from "../../constants/routeConstants";
import { NavLink } from "react-router-dom";

/**
 * about us page which contains details about the website along with the available features
 */
class  AboutUsPage extends React.Component{

    //state initialization
     state={featureList:[],features:[],loading:true};

    componentDidMount(){
        //fetching all the available features
        FeatureService.getAllFeatures().then((response)=>{
            this.setState({featureList:response,loading:false});
            this.setState({features:(this.state.featureList.map((feature,index)=>{
                return <FeaturesCard key={index} feature={feature}/>
            }))})
        });
    }
    
    render()
    {
        const {shopNow}=appConstants;

        return(
            <div className="about-us-main-container">
                <Header />
                <div className="about-us-container">
                    <img className="about-us-top-banner" src={aboutTopBanner} alt="about-top-banner"></img>
                    <img className="about-middle-banner" src={aboutMiddleBanner} alt="about-middle-banner"></img>
                    {!this.state.loading &&
                        <div className="about-us-card-container">
                            {this.state.features}
                        </div>
                    }
                    {this.state.loading &&  <Loader/>}
                    <footer>
                        <NavLink to={`${routeConstants.men}`}><Button  buttonName={shopNow} /></NavLink>
                    </footer>
                </div>
            </div>
        )
    }  
    
}

export default AboutUsPage;