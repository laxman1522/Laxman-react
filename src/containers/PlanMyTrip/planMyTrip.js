import './planMyTrip.scss';
import React, { useEffect, useRef, useState } from 'react';
import { AppConstants } from '../../constants/appConstants';
import { CitiesService } from '../../services/CitiesService';
import { memo } from 'react';
import Button from '../../components/Button/button';
import PropTypes from "prop-types";

/**
 *  Allows the user to select the source and destination and search for the flights
 */
const PlanMyTrip = (props) => {

    console.log("Container - Plan my trip");

    const {selectedDestination, searchFlights} = props;

    const sourceRef = useRef();
    const destinationRef = useRef();
    const [cities, setCities] = useState([]);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        const fetchCities = async() => {
            const cities = await CitiesService.fetchCities();
            setCities(cities);
        }

        fetchCities();
    },[])

    const sourceCitiesList = cities.map((city)=>{
        return <option key={city} value={city} selected={city==="Chennai" && "selected"}>{city}</option>
    }) 

    const destinationCitiesList = cities.map((city)=>{
        return <option key={city} value={city} selected={city==="Paris" && "selected"}>{city}</option>
    }) 

    const sourceCityHandler = () => {
        sourceRef.current.value === destinationRef.current.value ? setDisableButton(true) : setDisableButton(false);
    }

    //To disable the search button if the user selects same source & destination
    const destinationCityHandler = () => {
        sourceRef.current.value === destinationRef.current.value ? setDisableButton(true) : setDisableButton(false);
        selectedDestination(destinationRef.current.value, AppConstants.SELECTED)
    }

    //To pass the source and destination value thorugh props on click of search flights button
    const searchFlightsHandler = () => {
        searchFlights(sourceRef.current.value, destinationRef.current.value)
    }

    return(
        <div className='plan-my-trip-container'>
            <div className='title fw-bold'>{AppConstants.PLAN_MY_TRIP}</div>
            <div className='source d-flex'>
                <label htmlFor="source">{AppConstants.SOURCE}</label>
                <select id="source" ref={sourceRef} onChange={sourceCityHandler} >
                    {sourceCitiesList}
                </select>
                <i className="fa fa-caret-down"></i>
            </div>
            <div className='destination d-flex'>
                <label htmlFor="destination">{AppConstants.DESTINATION}</label>
                <select id="destination" onChange={destinationCityHandler} onClick={destinationCityHandler} ref={destinationRef} >
                    {destinationCitiesList}
                </select>
                <i className="fa fa-caret-down"></i>
            </div>
            <div className='search-button'>
                <Button buttonClickHandler={searchFlightsHandler} buttonName={AppConstants.SEARCH} disabled={disableButton}></Button>
            </div>
        </div>
    )
}

PlanMyTrip.propTypes = {
    selectedDestination: PropTypes.func,
    searchFlightsHandler: PropTypes.func
}

PlanMyTrip.defaultProps = {
    selectedDestination: () => {},
    searchFlightsHandler: () => {}
}

export default memo(PlanMyTrip);