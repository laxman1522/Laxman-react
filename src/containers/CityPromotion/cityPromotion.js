import './cityPromotion.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouristContext } from '../../App';
import TouristSpotCard from '../../components/TouristSpotCard/touristSpotCard';
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';
import PropTypes from "prop-types";

/**
 *  Responsible for showing the searched/selected destination
 */
const CityPromotion = (props) => {

    console.log("Container - City promotion");

    const touristSpots = useContext(TouristContext);
    const [previousDestination, setPreviousDestination] = useState();
    const destinationRef = useRef("empty");
    const touristSpotRef = useRef();
    const isValidDestinationRef = useRef(true);

    useEffect(() => {
            if(props.destination !== '') {
            setPreviousDestination(props.previousDestination);
            let validDestination = false;
            for(let touristSpot of touristSpots) {
                if(touristSpot?.city.toLowerCase() === props.destination.toLowerCase()) {
                    validDestination = true;
                }
            }
            (!validDestination && destinationRef.current !== "empty") && props.previousDestinationSelected('');
            (!validDestination && destinationRef.current === "empty") && props.previousDestinationSelected(AppConstants.NO_PREVIOUS_DESTINATION);
            destinationRef.current = props.destination;
            !validDestination && (isValidDestinationRef.current = false);
            validDestination && (isValidDestinationRef.current = true);
            }
            else {
                isValidDestinationRef.current = false;
                setPreviousDestination('');
            }
    }, [props.destination, props.previousDestination]);

    const selectedTouristSpots = touristSpots.map((touristSpot) => {
        if(touristSpot?.city.toLowerCase() === props.destination.toLowerCase()) {
            !isValidDestinationRef.current && (isValidDestinationRef.current = true);
            touristSpotRef.current = touristSpot;
            return <TouristSpotCard key={touristSpot.city} touristSpot={touristSpot}></TouristSpotCard>
        }
    });

    //To Update the previous destination 
    const previousDestinationHandler = () => {
        (isValidDestinationRef.current = true);
        props.previousDestinationSelected(previousDestination);
    };


    return(
        <div className='city-promotion-container '> 
        {isValidDestinationRef.current && 
                <React.Fragment>
                <div className='city-promotion-title fw-bold'>{AppConstants.TRAVELLING_TO}{touristSpotRef.current?.city.toUpperCase()} ? {AppConstants.KNOW_MORE}</div>
                <div className='temperature'>{touristSpotRef?.current?.temperature}</div>
                <div className='description'>{touristSpotRef?.current?.description}</div>
                <div className='tourist-spots d-flex'>
                    {selectedTouristSpots}
                </div>
                {previousDestination !=='' && 
                    <button className='previous' onClick={previousDestinationHandler}>{AppConstants.PREVIOUS}</button>
                }
                </React.Fragment> 
        }
        {!isValidDestinationRef.current && 
            <div className='no-cities d-flex fw-bold'>{AppConstants.NO_CITIES}</div>
        }
        </div>
    )
}

CityPromotion.propTypes = {
    previousDestination: PropTypes.string,
    searchedDestination: PropTypes.string,
    destination: PropTypes.string,
    previousDestinationSelected: PropTypes.func
}

CityPromotion.defaultProps = {
    previousDestination: AppConstants.NIL,
    searchedDestination: AppConstants.NIL,
    destination: AppConstants.NIL,
    previousDestinationSelected: () => {}
}

export default memo(CityPromotion);