import styles from './header.module.scss'
import logo from '../../assets/logo.png';
import React, { useContext } from "react";
import { APPCONSTANTS } from '../../constants/appConstants';
import { memo } from 'react';
import { userDetailsContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/routeConstants';



const Header = () => {

    console.log("Header container");

    const userDetails = useContext(userDetailsContext);

    const {APP_TITLE, HOME, ALL_MOVIES, LOGIN, LOGOUT, NOW_SHOWING} = APPCONSTANTS;

    return (
        <div className={`${styles.headerContainer}`}>
            <img className={styles.logo} src={logo} alt={APP_TITLE}></img>
            <div className={`${styles.options} d-flex`}>
                <NavLink to={ROUTE_CONSTANTS.HOME} className={styles.home}>{HOME}</NavLink>
                <NavLink to={ROUTE_CONSTANTS.ALL_MOVIES} className={styles.allMovies}>{ALL_MOVIES}</NavLink>
                {userDetails?.isUserLoggedIn && <NavLink to={ROUTE_CONSTANTS.NOW_SHOWING} className={styles.nowShowing}>{NOW_SHOWING}</NavLink> }
            </div>
            <div className={`${styles.userLogin} d-flex`}>
                {userDetails?.isUserLoggedIn && <div className={styles.user}>{userDetails?.userName}</div> }
                {!(userDetails?.isUserLoggedIn) && <NavLink to={ROUTE_CONSTANTS.LOGIN} className={styles.login}>{LOGIN}</NavLink> }
                {userDetails?.isUserLoggedIn && <NavLink to={ROUTE_CONSTANTS.LOGIN}  className={styles.logout}>{LOGOUT}</NavLink> }
            </div>
        </div>
    )
}

export default memo(Header);