import './buttonGroup.scss';
import React, { useCallback, useMemo } from 'react';
import Button from '../Button/button';
import  PropTypes from "prop-types";
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';

/**
 *  responsible for showing list of appropriate buttons 
 */
const ButtonGroup = (props) => {

    console.log("component - button Group component");

    const {value,type} = props.buttonValue;

    const buttonClickHandler = useCallback((buttonValue) => {
        props.buttonClickHandler(buttonValue);
    },[]);

    return(
        <div className='button-group d-flex'>
            <Button buttonName={value[0]+ " " +type} buttonClickHandler={buttonClickHandler}></Button>
            <Button buttonName={value[1]+ " " +type} buttonClickHandler={buttonClickHandler}></Button>
            <Button buttonName={value[2]+ " " +type} buttonClickHandler={buttonClickHandler}></Button>
        </div>
    )
}

ButtonGroup.propTypes={
    value: PropTypes.number,
    type: PropTypes.string,
    buttonClickHandler: PropTypes.func
}

ButtonGroup.defaultProps={
    value: 0,
    type: AppConstants.NIL,
    buttonClickHandler: () => {}
}

export default memo(ButtonGroup);