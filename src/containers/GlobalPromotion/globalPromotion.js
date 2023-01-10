import "./globalPromotion.scss";
import React, { useContext} from "react";
import TouristSpotCard from "../../components/TouristSpotCard/touristSpotCard";
import { AppConstants } from "../../constants/appConstants";
import { TouristContext } from "../../App";
import { memo } from "react";

/**
 *  Responsible for showing all the available locations
 */
const GlobalPromotion = () => {

    console.log("Container - Global promotion ")

    const touristSpots = useContext(TouristContext);

    const touristSpotsCard = touristSpots.map((touristSpot) => {
        return <TouristSpotCard key={touristSpot.city} touristSpot={touristSpot}></TouristSpotCard>
    })

    return(
            <div className="global-promotion-container">
                <div className="global-promotion-title fw-bold">{AppConstants.GLOBAL_PROMOTION_TITLE}</div>
                <div className="tourist-cards-container">
                    {touristSpotsCard}
                </div>
            </div>
    )
}

export default memo(GlobalPromotion);