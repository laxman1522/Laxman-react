import './time.scss';
import React from 'react';
import  PropTypes from "prop-types";
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';

/**
 * Responsible for showing the session, EST & IST time to the user
 */
const Time = (props) => {
    
    console.log("component - time");

    const {heading, subHeading} = props;

    return(
        <div className='time d-flex '>
            <div className='time-title'>{heading}</div>
            <div className='time-value'>{subHeading}</div>
        </div>
    )
}

Time.propTypes={
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}

Time.defaultProps={
    heading: AppConstants.NIL,
    subHeading: AppConstants.NIL
}

export default memo(Time);