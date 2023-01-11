import './flightCard.scss';
import React from 'react';
import flightLogo from '../../assets/air-india.png';
import Button from '../Button/button';
import { AppConstants } from '../../constants/appConstants';
import  PropTypes from "prop-types";
import { memo } from 'react';

/**
 * Responsible for showing the individual flight details
 */
const FlightCard = (props) => {

    console.log("component - flight card");

    const {flightDetails,bookNowHandler} = props

    const {flight,source,destination,Date,fare} = flightDetails;

    const buttonClickHandler = () => {
       bookNowHandler(flightDetails);
    }

    return(
        <div className='flight-container d-flex justify-space-between'>
            <div className='logo-info d-flex'>
                <img src={flightLogo} alt="flight-logo"></img>
                <div className='info'>
                    <div className='flight-date'>{flight} - {Date}</div>
                    <div className='source-destination'>{source.charAt(0).toUpperCase() + source.slice(1)} -  {destination.charAt(0).toUpperCase() + destination.slice(1)}</div>
                    <div className='fare fw-bold'>{AppConstants.DOLLAR} {fare}</div>
                </div>
            </div>
            <Button buttonName={AppConstants.BOOK} buttonClickHandler={buttonClickHandler}></Button>
        </div>
    )
}

FlightCard.propTypes={
    flight: PropTypes.string,
    source: PropTypes.string,
    destination: PropTypes.string,
    Date: PropTypes.string,
    fare: PropTypes.number,
    bookNowHandler: PropTypes.func
}

FlightCard.defaultProps={
    flight: AppConstants.NIL,
    source: AppConstants.NIL,
    destination: AppConstants.NIL,
    Date: AppConstants.NIL,
    fare: 0,
    bookNowHandler: () => {}
}

export default memo(FlightCard);