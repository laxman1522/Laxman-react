import './header.scss';
import React, { useCallback, useContext } from "react";
import logo from '../../assets/logo.png';
import prime from '../../assets/prime.png';
import { AppConstants } from '../../constants/appConstants';
import Time from '../Time/time';
import  PropTypes from "prop-types";
import useSessionTime from '../../customHooks/useSessionTime';
import useTime from '../../customHooks/useTime';
import { memo } from 'react';

/**
 * Responsible for displaying user details and time
 */
const Header = (props) => {

    console.log("component - header");

    const userDetails = props.userDetails;

    //custom hook for updating the session time
    const [sessionTime] = useSessionTime();

    //custom hook for updating IST and EST time
    const [istDateTime] = useTime(sessionTime,"IST");
    const [estDateTime] = useTime(sessionTime,"EST");

    return(
        <div className='header-container d-flex justify-space-between align-items-center'>
            <div>
                <img src={logo} alt="logo" className='logo'></img>
                {userDetails?.type==="prime" && <img src={prime} alt="prime" className='prime'></img> }
            </div>
            <div className='timezone-username d-flex align-items-center'>
                <div className='time-zones d-flex justify-space-between'>
                    <Time heading={AppConstants.SESSIONTIME} subHeading={sessionTime + " " + AppConstants.MIN}></Time>
                    <Time heading={estDateTime?.estDate} subHeading={estDateTime?.estTime}></Time>
                    <Time heading={istDateTime?.istDate} subHeading={istDateTime?.istTime}></Time>
                </div>
                <div className='user-name'>{AppConstants.HI}, {userDetails?.username?.charAt(0).toUpperCase() + userDetails.username?.slice(1)}</div>
            </div>
        </div>
    )
}

Header.propTypes={
    userDetails: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ])
}

Header.defaultProps={
    userDetails: {},
}

export default memo(Header);