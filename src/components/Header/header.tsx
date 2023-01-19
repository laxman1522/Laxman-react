import styles from './header.module.scss'
import logo from '../../assets/logo.png';
import React, { useContext, useEffect, useState } from "react";
import { APPCONSTANTS } from '../../constants/appConstants';
import { memo } from 'react';
import { userDetailsContext } from '../../App';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/routeConstants';



const Header = () => {

    const user = useContext(userDetailsContext);

    console.log("Header container");

    const location = useLocation();

    const [loginPage, setLoginPage] = useState(false);

    useEffect(() => {
        location.pathname === ROUTE_CONSTANTS.LOGIN ? setLoginPage(true) : setLoginPage(false);
    },[location])

    const {APP_TITLE, HOME, ALL_MOVIES, LOGIN, LOGOUT, NOW_SHOWING} = APPCONSTANTS;

    return (
        <div className={`${styles.headerContainer}`}>
            <img className={styles.logo} src={logo} alt={APP_TITLE}></img>
           {!loginPage && <React.Fragment>
                <div className={`${styles.options} d-flex`}>
                    <NavLink to={ROUTE_CONSTANTS.HOME} className={styles.home}>{HOME}</NavLink>
                    <NavLink to={ROUTE_CONSTANTS.ALL_MOVIES} className={styles.allMovies}>{ALL_MOVIES}</NavLink>
                    {user?.userDetails?.isUserLoggedIn && <NavLink to={ROUTE_CONSTANTS.NOW_SHOWING} className={styles.nowShowing}>{NOW_SHOWING}</NavLink> }
                </div>
                <div className={`${styles.userLogin} d-flex`}>
                    {user?.userDetails?.isUserLoggedIn && <div className={styles.user}>{user?.userDetails?.userName}</div> }
                    {user?.userDetails?.isUserLoggedIn && <div className={styles.border}></div> }
                    {!(user?.userDetails?.isUserLoggedIn) && <NavLink to={ROUTE_CONSTANTS.LOGIN} className={styles.login}>{LOGIN.toUpperCase()}</NavLink> }
                    {user?.userDetails?.isUserLoggedIn && <NavLink to={ROUTE_CONSTANTS.LOGIN}  className={styles.logout}>{LOGOUT}</NavLink> }
                </div>
            </React.Fragment>}
        </div>
    )
}

export default memo(Header);