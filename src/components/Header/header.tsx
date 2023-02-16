import styles from './header.module.scss'
import logo from '../../assets/logo.png';
import React, {  useContext, useEffect, useState } from "react";
import { APPCONSTANTS } from '../../constants/appConstants';
import { memo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/routeConstants';
import { userDetailsContext } from '../../App';


/**
 * 
 * @returns jsx responsible for showing header along with menu options
 */
const Header: React.FC = () => {

    //using location to access the path name
    const location = useLocation();

    const navigate = useNavigate();

    //using state for maintaining the user details 
    const {userDetails} = useContext(userDetailsContext);

    const [loginPage, setLoginPage] = useState(false);

    //use effect for conditionally remove or update user details
    useEffect(() => {
        location.pathname === ROUTE_CONSTANTS.LOGIN ? setLoginPage(true) : setLoginPage(false);
        location.pathname === ROUTE_CONSTANTS.LOGIN && localStorage.removeItem("user");
    },[location])

    const navigateToHomePage = () => {
        navigate(ROUTE_CONSTANTS.HOME);
    }

    //INFO:destructuring constants
    const {APP_TITLE, HOME, ALL_MOVIES, LOGIN, LOGOUT, NOW_SHOWING} = APPCONSTANTS;

    return (
        <div className={`${styles.headerContainer}`}>
            <img className={styles.logo} src={logo} onClick={navigateToHomePage} alt={APP_TITLE}></img>
           {!loginPage && <React.Fragment>
                <div className={`${styles.options} d-flex`}>
                    <NavLink to={ROUTE_CONSTANTS.HOME} className={styles.home}>{HOME}</NavLink>
                    <NavLink to={ROUTE_CONSTANTS.ALL_MOVIES} className={styles.allMovies}>{ALL_MOVIES.toUpperCase()}</NavLink>
                    {userDetails!==null && <NavLink to={ROUTE_CONSTANTS.NOW_SHOWING} className={styles.nowShowing}>{NOW_SHOWING.toUpperCase()}</NavLink> }
                </div>
                <div className={`${styles.userLogin} d-flex`}>
                    {userDetails!==null && 
                        <React.Fragment>
                        <div className={styles.user}>{JSON.parse(userDetails).username}</div>
                        <div className={styles.border}></div>
                        <NavLink to={ROUTE_CONSTANTS.LOGIN}  className={styles.logout}>{LOGOUT}</NavLink>
                        </React.Fragment>
                    }
                    {userDetails===null  && <NavLink to={ROUTE_CONSTANTS.LOGIN} className={styles.login}>{LOGIN.toUpperCase()}</NavLink> }
                </div>
            </React.Fragment>}
        </div>
    )
}

export default memo(Header);