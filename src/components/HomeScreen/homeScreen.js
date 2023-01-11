import './homeScreen.scss';
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import GlobalPromotion from '../../containers/GlobalPromotion/globalPromotion';
import PlanMyTrip from '../../containers/PlanMyTrip/planMyTrip';
import Search from '../../containers/Search/search';
import { TouristSpotsService } from '../../services/TouristSpotsService';
import { memo } from 'react';
import { FlightService } from '../../services/FlightService';
import AvailableFlights from '../../containers/AvailableFlights/availableFlights';
import BookingContainer from '../../containers/BookingContainer/bookingContainer';
import { AppConstants } from '../../constants/appConstants';
import CityPromotion from '../../containers/CityPromotion/cityPromotion';


const HomeScreen = () => {

  console.log("component - Home screen main container");

      const searchedDestinationRef = useRef();
      const previousDestinationRef = useRef('');
      const previousDestionationSelected = useRef(false);
      const [destination, setDestination] = useState('');
      const [showCityPromotion, setShowCitypromotion] = useState(false);
      const [availableFlights, setAvailableFlights] = useState();
      const [flightDetails, setFlightDetails] = useState([]);
      const [showBookingContainer, setShowBookingContainer] = useState(false);

      //To update the destination based on the user input
      const updateDestination = useCallback((destination,type) => {
        if(destination.toLowerCase() !== previousDestinationRef.current && destination.toLowerCase() !== searchedDestinationRef.current) {
          if (searchedDestinationRef.current!==undefined && previousDestionationSelected.current !== true ) {
            (previousDestinationRef.current = searchedDestinationRef.current);
          } 
          type === AppConstants.SEARCHED && (searchedDestinationRef.current = destination);
          setDestination(destination);
          setShowCitypromotion(true);
        }
        else {
          if( searchedDestinationRef.current === previousDestinationRef.current) {
            previousDestinationRef.current = '';
          }
          setDestination(destination);
          setShowCitypromotion(true);
        }      
      },[])
    
      //To update the previous destination once the user clicks the previous button
      const previousDestinationSelectHandler = useCallback((updateDestination) => {
        if(updateDestination === AppConstants.NO_PREVIOUS_DESTINATION) {
          previousDestinationRef.current !=='' && (searchedDestinationRef.current = previousDestinationRef.current)
          searchedDestinationRef.current = '';
          previousDestinationRef.current = '';
          setDestination('');
        } else if(updateDestination !== '') {
          previousDestinationRef.current = '';
          previousDestionationSelected.current = true;
          setDestination(updateDestination);
        } else {
          previousDestinationRef.current !=='' && (searchedDestinationRef.current = previousDestinationRef.current)
          previousDestinationRef.current = '';
          setDestination('');
        }
      },[]);
    
      //To update the flight details once the user clicks search flights
      const searchFlightsHandler = useCallback(async (source, destination) => {
          let flights = await FlightService.getFlights(source.toLowerCase(), destination.toLowerCase());
          setAvailableFlights(flights);
          setShowBookingContainer(false);
      },[]);
    
      //To update the intial fare,membership discount, tax value based on the selected flight
      const bookNowHandler = useCallback((flightDetails) => {
          setFlightDetails(flightDetails);
          setShowBookingContainer(true);
      },[])

    return(
            <div className='main-container d-flex justify-space-between'>
            <div className="left-container">
                <Search searchDestination={updateDestination}></Search>
                {showCityPromotion && <CityPromotion destination={destination} 
                previousDestination={previousDestinationRef.current} previousDestinationSelected={previousDestinationSelectHandler}></CityPromotion> }
                <GlobalPromotion></GlobalPromotion>
            </div>
            <div className="right-container">
                <PlanMyTrip selectedDestination={updateDestination} searchFlights={searchFlightsHandler}></PlanMyTrip>
                {availableFlights && <AvailableFlights flights={availableFlights} bookNowHandler={bookNowHandler}></AvailableFlights>}
                {showBookingContainer && <BookingContainer flightDetails={flightDetails} ></BookingContainer>}
            </div>
            </div>
    )
}

export default memo(HomeScreen);