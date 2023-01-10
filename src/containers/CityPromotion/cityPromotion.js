import './cityPromotion.scss';
import React, { useContext, useEffect, useState } from 'react';
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
    const [destination,setDestination] = useState("empty");
    const [touristSpot, setTouristSpot] = useState();
    const [selectedTouristSpots, setSelectedTouristSpots] = useState();
    const [isValidDestination, setIsValidDestination] = useState(false);
    const [previousDestination, setPreviousDestination] = useState();

    useEffect(() => {
        setPreviousDestination(props.previousDestination);
        setDestination(props.destination);
    }, [props.destination, props.previousDestination]);

    useEffect(() => {
        let isValidDestination = false;
        const selectedTouristSpots = touristSpots.map((touristSpot) => {
            if(touristSpot?.city.toLowerCase() === destination.toLowerCase()) {
                isValidDestination = true;
                setTouristSpot(touristSpot);
                return <TouristSpotCard key={touristSpot.city} touristSpot={touristSpot}></TouristSpotCard>
            }
        });
        setSelectedTouristSpots(selectedTouristSpots);
        ((!isValidDestination && destination!=="empty") && props.previousDestinationSelected(''));
        !isValidDestination && setIsValidDestination(false);
        isValidDestination && setIsValidDestination(true);
    }, [destination])

    const previousDestinationHandler = () => {
        setIsValidDestination(true);
        props.previousDestinationSelected(previousDestination);
    };


    return(
        <div className='city-promotion-container '> 
        {isValidDestination && 
                <React.Fragment>
                <div className='city-promotion-title fw-bold'>{AppConstants.TRAVELLING_TO}{touristSpot?.city} ? {AppConstants.KNOW_MORE}</div>
                <div className='temperature'>{touristSpot?.temperature}</div>
                <div className='description'>{touristSpot?.description}</div>
                <div className='tourist-spots d-flex'>
                    {selectedTouristSpots}
                </div>
                {previousDestination!=='' && 
                    <button className='previous' onClick={previousDestinationHandler}>{AppConstants.PREVIOUS}</button>
                }
                </React.Fragment> 
        }
        {!isValidDestination && 
            <div className='no-cities d-flex fw-bold'>{AppConstants.NO_CITIES}</div>
        }
        </div>
    )
}

CityPromotion.propTypes = {
    previousDestination: PropTypes.string,
    searchedDestination: PropTypes.string,
    destination: PropTypes.string
}

CityPromotion.defaultProps = {
    previousDestination: AppConstants.NIL,
    searchedDestination: AppConstants.NIL,
    destination: AppConstants.NIL
}

export default memo(CityPromotion);