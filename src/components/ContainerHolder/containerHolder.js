import './containerHolder.scss';
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

export const TouristContext = React.createContext();
export const PrimeContext = React.createContext();
export const MembershipDiscountContext = React.createContext();
export const TaxAmountContext = React.createContext();


const ContainerHolder = () => {

  console.log("component - container holder");

    const MembershipDiscount = {
        type:AppConstants.MEMBERSHIP_DISCOUNT,
        amount:10
      }
    
    const TaxAmount = {
        type:AppConstants.TAX_AMOUNT,
        amount:5
    }

      const searchedDestinationRef = useRef();
      const previousDestinationRef = useRef('');

      const [destination, setDestination] = useState('');
      const [touristSpots, setTouristSpots] = useState([]);
      const [searchedDestination, setSearchedDestination] = useState();
      const [previousDestination, setPreviousDestination] = useState('');
      const [showCityPromotion, setShowCitypromotion] = useState(false);
      const [availableFlights, setAvailableFlights] = useState();
      const [flightDetails, setFlightDetails] = useState([]);
      const [fare,setFare] = useState();
      const [membershipDiscount, setMembershipDiscount] = useState(MembershipDiscount);
      const [taxAmount, setTaxAmount] = useState(TaxAmount);
      const [showBookingContainer, setShowBookingContainer] = useState(false);

    useEffect(() => {
      
        const touristSpots = async() => {
            const touristSpots = await TouristSpotsService.getTouristSpots();
            setTouristSpots(touristSpots)
        }
        touristSpots();
      }, [])
    
      //To update the destination based on the search bar value
      const searchDestination = useCallback((searchDestination) => { 
        if(searchDestination!==destination) {
          searchedDestinationRef.current!==undefined && setPreviousDestination(searchedDestinationRef.current);
          searchedDestinationRef.current!==undefined && (previousDestinationRef.current = searchedDestinationRef.current);
          setSearchedDestination(searchDestination);
          searchedDestinationRef.current = searchDestination;
          setDestination(searchDestination);
          setShowCitypromotion(true);   
        }
      },[]);

      //To update the destination based on the drop down value
      const selectedDestination = useCallback((selectedDestination) => {
        if(selectedDestination.toLowerCase() !== previousDestinationRef.current && selectedDestination.toLowerCase() !== searchedDestinationRef.current) {
            searchedDestinationRef.current!==undefined && setPreviousDestination(searchedDestinationRef.current);
            searchedDestinationRef.current!==undefined && (previousDestinationRef.current = searchedDestinationRef.current);
            setDestination(selectedDestination);
            setShowCitypromotion(true);  
        } else {
            setPreviousDestination("");
            previousDestinationRef.current = '';
            setDestination(selectedDestination);
            setShowCitypromotion(true);  
        }
        
      },[]);
    
      //To update the previous destination once the user clicks the previous button
      const previousDestinationSelectHandler = useCallback((destination) => {
          setSearchedDestination("");
          searchedDestinationRef.current = '';
          setPreviousDestination('');
          setDestination(destination);
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
          setMembershipDiscount(MembershipDiscount);
          setTaxAmount(TaxAmount);
      },[])

    return(
        <TouristContext.Provider value={touristSpots}>
            <div className='main-container d-flex justify-space-between'>
            <div className="left-container">
                <Search searchDestination={searchDestination}></Search>
                {showCityPromotion && <CityPromotion destination={destination} searchedDestination={searchedDestination} 
                previousDestination={previousDestination} previousDestinationSelected={previousDestinationSelectHandler}></CityPromotion> }
                <GlobalPromotion></GlobalPromotion>
            </div>
            <div className="right-container">
                <PlanMyTrip selectedDestination={selectedDestination} searchFlights={searchFlightsHandler}></PlanMyTrip>
                {availableFlights && <AvailableFlights flights={availableFlights} bookNowHandler={bookNowHandler}></AvailableFlights>}
                <MembershipDiscountContext.Provider value={membershipDiscount}>
                <TaxAmountContext.Provider value={taxAmount}>
                    {showBookingContainer && <BookingContainer flightDetails={flightDetails} ></BookingContainer>}
                </TaxAmountContext.Provider>
                </MembershipDiscountContext.Provider>
            </div>
            </div>
      </TouristContext.Provider>
    )
}

export default memo(ContainerHolder);