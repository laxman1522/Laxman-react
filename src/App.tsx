import React, { lazy, useState, Suspense, useEffect } from 'react';
import './App.scss';
import { userDetails } from './modal/commonModel';
import { ROUTE_CONSTANTS } from './constants/routeConstants';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Loader from './components/Loader/loader';

const Home = lazy(() => import ('./pages/Home/home'));
const AllMovies = lazy(() => import ('./pages/AllMovies/allMovies'));
const Login = lazy(() => import('./pages/Login/login'));
const NowWatching = lazy(() => import('./pages/NowWatching/nowWatching'));

// eslint-disable-next-line @typescript-eslint/no-redeclare
const userLoginDetails : userDetails = {
  isUserLoggedIn: false,
  userName: '',
}

export const userDetailsContext = React.createContext<any>(userLoginDetails);
export const movieDetailsContext = React.createContext<any>([]);
export const loadingContext = React.createContext<any>(false);
export const errorContext = React.createContext<any>(false);


function App() {

  const [userDetails, setUserDetails] = useState(userLoginDetails);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

  let user = localStorage.getItem("user");

  useEffect(() => {
      user = localStorage.getItem("user");
  })
  

  return (
    <React.Fragment>
      <userDetailsContext.Provider value={{userDetails, setUserDetails}}>
        <movieDetailsContext.Provider value={{currentMovie, setCurrentMovie}}>
          <loadingContext.Provider value={{loading, setLoading}}>
            <errorContext.Provider value={{errorOccured, setErrorOccured}}>
          <BrowserRouter>
          <Suspense fallback={<Loader></Loader>}>
          <Routes>
              <Route path={ROUTE_CONSTANTS.HOME} element={<Home/>}/>
              <Route path={ROUTE_CONSTANTS.ALL_MOVIES} element={<AllMovies/>}/>
              <Route path={ROUTE_CONSTANTS.NOW_SHOWING} element={ user!==null ? <NowWatching/> : <Navigate to={ROUTE_CONSTANTS.HOME} replace />}/>
              <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login/>}/>
              <Route path="*" element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />}/>
          </Routes>
          </Suspense>
          </BrowserRouter>
          </errorContext.Provider>
          </loadingContext.Provider>
        </movieDetailsContext.Provider>
      </userDetailsContext.Provider> 
    </React.Fragment>
  );
}

export default App;