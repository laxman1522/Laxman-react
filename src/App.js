/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/header';
import { TouristSpotsService } from './services/TouristSpotsService';
import { UserInfoService } from './services/UserInfoService';
import { memo } from 'react';
import { AppConstants } from './constants/appConstants';
import ContainerHolder from './components/ContainerHolder/containerHolder';

export const TouristContext = React.createContext();
export const PrimeContext = React.createContext();

function App() {

  const [userDetails, setUserDetails] = useState('');
  const [touristSpots, setTouristSpots] = useState([]);
  const [isUserPrime, setIsUserPrime] = useState();

  const mockUsers = AppConstants.MOCK_USERS;

  useEffect(() => {
    const userDetails = async() => {
      const userInfo = await UserInfoService.loginInUser(mockUsers[0].name, mockUsers[0].password);
      setUserDetails(userInfo);
      userInfo.type === "prime" ? setIsUserPrime(true) : setIsUserPrime(false);
    }
    userDetails();
  }, [])

  useEffect(() => {
    const touristSpots = async() => {
        const touristSpots = await TouristSpotsService.getTouristSpots();
        setTouristSpots(touristSpots)
    }

    touristSpots();
  }, [])

  return (
    <React.Fragment>
      <PrimeContext.Provider value={isUserPrime}>
      <Header userDetails={userDetails}></Header>
      <TouristContext.Provider value={touristSpots}>
        <ContainerHolder></ContainerHolder>
      </TouristContext.Provider>
      </PrimeContext.Provider>
    </React.Fragment>
  );
}

export default memo(App);
