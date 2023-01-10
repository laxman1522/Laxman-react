import "./touristSpotCard.scss";
import React, { useRef } from 'react';
import PropTypes from "prop-types";
import { AppConstants } from "../../constants/appConstants";
import fakeImg from '../../assets/fakeImg.jpeg';
import { memo } from "react";

/**
 *  Responsible for showing the individual tourist spot details
 */
const TouristSpotCard = (props) => {

    console.log("component - touristspotcard")

    const {img,place,city} = props.touristSpot;

    const imgRef = useRef();

    const invalidImageHandler = () => {
        imgRef.current.src = fakeImg;
    }

    return(
        <div className="tourist-spot-card">
            <img src={img} alt={place} ref={imgRef} onError={invalidImageHandler}></img>
            <div className="tourist-place fw-bold">{place}</div>
            <div className="tourist-city">{city}</div>
        </div>
    )
}

TouristSpotCard.propTypes = {
    img: PropTypes.string,
    place: PropTypes.string,
    city: PropTypes.string
}

TouristSpotCard.defaultProps = {
    img: fakeImg,
    place: AppConstants.NIL,
    city: AppConstants.NIL
}

export default memo(TouristSpotCard);