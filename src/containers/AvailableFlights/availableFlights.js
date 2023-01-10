import './availableFlights.scss';
import React, { useEffect, useState } from 'react';
import FlightCard from '../../components/FlightCard/flightCard';
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';
import propTypes from "prop-types";


/**
 *  Responsible for showing the available flights for the selected source & destination
 */
const AvailableFlights = (props) => {

    console.log("Container - Available Flights")

    const {flights,bookNowHandler} = props;

    const [noFlights, setNoFlights] = useState(false);

    useEffect(() => {
       flights.length === 0 ? setNoFlights(true) : setNoFlights(false);
    },[flights])

    //passing the selected flight details through props
    const bookNow = (flightDetails) => {
        bookNowHandler(flightDetails);
    }

    const flightsList = props.flights.map((flight,i) => {
        return <FlightCard key={i} flightDetails={flight} bookNowHandler={bookNow}></FlightCard>
    })

    return ( 
             <div className='available-flights-container'>
                {!noFlights && 
                <React.Fragment>
                    <div className='available-flights fw-bold'>{AppConstants.AVAILABLE_FLIGHTS}</div>
                    {flightsList} 
                </React.Fragment>}
                {noFlights && <div className='no-flights fw-bold'>{AppConstants.NO_FLIGHTS_AVAILABLE}</div>}
            </div>
    )
}

AvailableFlights.propTypes = {
    flights: propTypes.array
}

AvailableFlights.defaultProps = {
    flights: []
}

export default memo(AvailableFlights);