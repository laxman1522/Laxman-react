import React, { Component, useContext, useState } from 'react';
import './App.scss';
import { userDetails } from './modal/commonModel';
import Home from './pages/Home/home';
import { ROUTE_CONSTANTS } from './constants/routeConstants';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NowWatching from './pages/NowWatching/nowWatching';
import Login from './pages/Login/login';

// eslint-disable-next-line @typescript-eslint/no-redeclare
const userLoginDetails : userDetails = {
  isUserLoggedIn: false,
  userName: '',
}

export const userDetailsContext = React.createContext<any>(userLoginDetails);

function App() {

  const [userDetails, setUserDetails] = useState(userLoginDetails);

  return (
    <React.Fragment>
      <userDetailsContext.Provider value={{userDetails, setUserDetails}}>
        <BrowserRouter>
        <Routes>
            <Route path={ROUTE_CONSTANTS.HOME} element={<Home/>}/>
            <Route path={ROUTE_CONSTANTS.ALL_MOVIES} element={<Home/>}/>
            <Route path={ROUTE_CONSTANTS.NOW_SHOWING} element={localStorage.getItem("login")==="true" ? <NowWatching/> : <Navigate to={ROUTE_CONSTANTS.HOME} replace />}/>
            <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login/>}/>
            <Route path="*" element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />}/>
        </Routes>
        </BrowserRouter>
      </userDetailsContext.Provider> 
    </React.Fragment>
  );
}

export default App;