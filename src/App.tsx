import React, { useState } from 'react';
import './App.scss';
import { userDetails } from './modal/commonModel';
import Home from './pages/Home/home';
import { ROUTE_CONSTANTS } from './constants/routeConstants';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NowWatching from './pages/NowWatching/nowWatching';
import Login from './pages/Login/login';

export const userDetailsContext = React.createContext<userDetails | null>(null);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const userLoginDetails : userDetails = {
    isUserLoggedIn: false,
    userName: '',
  }

function App() {

  console.log("App container");

  const [userDetails, setUserDetails] = useState(userLoginDetails);

  return (
    <React.Fragment>
      <userDetailsContext.Provider value={userDetails}>
        <BrowserRouter>
        <Routes>
            <Route path={ROUTE_CONSTANTS.HOME} element={<Home/>}/>
            <Route path={ROUTE_CONSTANTS.ALL_MOVIES} element={<Home/>}/>
            <Route path={ROUTE_CONSTANTS.NOW_SHOWING} element={<NowWatching/>}/>
            <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login/>}/>
            <Route path="*" element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />}/>
        </Routes>
        </BrowserRouter>
      </userDetailsContext.Provider> 
    </React.Fragment>
  );
}

export default App;