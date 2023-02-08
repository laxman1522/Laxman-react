import styles from './header.module.scss'
import logo from '../../assets/logo.png';
import React, {  useEffect, useState } from "react";
import { APPCONSTANTS } from '../../constants/appConstants';
import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/routeConstants';

//INFO: initial user details
const user = {
    username: "",
    login: "false"
}

/**
 * 
 * @returns jsx responsible for showing header along with menu options
 */
const Header: React.FC = () => {

    //using location to access the path name
    const location = useLocation();

    //using state for maintaining the user details 
    const [userDetails, setUserDetails] = useState(user);

    const [loginPage, setLoginPage] = useState(false);

    //use effect for conditionally remove or update user details
    useEffect(() => {
        location.pathname === ROUTE_CONSTANTS.LOGIN ? setLoginPage(true) : setLoginPage(false);
        location.pathname === ROUTE_CONSTANTS.LOGIN && localStorage.removeItem("user");
        let user = localStorage.getItem("user");
        user &&  setUserDetails(JSON.parse(user));
    },[location])

    //INFO:destructuring constants
    const {APP_TITLE, HOME, ALL_MOVIES, LOGIN, LOGOUT, NOW_SHOWING} = APPCONSTANTS;

    return (
        <div className={`${styles.headerContainer}`}>
            <img className={styles.logo} src={logo} alt={APP_TITLE}></img>
           {!loginPage && <React.Fragment>
                <div className={`${styles.options} d-flex`}>
                    <NavLink to={ROUTE_CONSTANTS.HOME} className={styles.home}>{HOME}</NavLink>
                    <NavLink to={ROUTE_CONSTANTS.ALL_MOVIES} className={styles.allMovies}>{ALL_MOVIES.toUpperCase()}</NavLink>
                    {userDetails?.login!=='false' && <NavLink to={ROUTE_CONSTANTS.NOW_SHOWING} className={styles.nowShowing}>{NOW_SHOWING.toUpperCase()}</NavLink> }
                </div>
                <div className={`${styles.userLogin} d-flex`}>
                    {userDetails?.login!=='false'  && <div className={styles.user}>{userDetails?.username}</div> }
                    {userDetails?.login!=='false'  && <div className={styles.border}></div> }
                    {userDetails?.login==='false'  && <NavLink to={ROUTE_CONSTANTS.LOGIN} className={styles.login}>{LOGIN.toUpperCase()}</NavLink> }
                    {userDetails?.login!=='false'  && <NavLink to={ROUTE_CONSTANTS.LOGIN}  className={styles.logout}>{LOGOUT}</NavLink> }
                </div>
            </React.Fragment>}
        </div>
    )
}

export default memo(Header);