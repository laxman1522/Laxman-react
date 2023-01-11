import './button.scss';
import  PropTypes from "prop-types";
import { AppConstants } from '../../constants/appConstants';
import { memo } from 'react';

/**
 * Button component responsible for all the buttons inside the application
 */
const Button = (props) => {

    console.log("component - button component");

    const {buttonName,disabled, buttonClickHandler} = props;

    const onButtonClick = () => {
        buttonClickHandler(buttonName);
    }

    return(
        <button className='btn' onClick={onButtonClick} disabled={disabled}>{buttonName}</button>
    )
}

Button.propTypes={
    buttonName:PropTypes.string,
    disabled:PropTypes.bool,
    buttonClickHandler: PropTypes.func,
}

Button.defaultProps={
    buttonName:AppConstants.NIL,
    disabled:false,
    buttonClickHandler: ()=> {}
}

export default memo(Button);