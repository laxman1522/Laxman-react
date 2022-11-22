import "./Button.scss";
import  PropTypes from "prop-types";
import { AppConstants } from "../../constants/appConstants";

/**
 * Button component responsible for all the buttons inside the application
 */
const Button = (props) => {

    const {buttonName,buttonClickHandler,disabled} = props;

    const buttonClicked = () => {
        buttonClickHandler();
    }

    return (
        <button className="button" onClick={buttonClicked} disabled={disabled}>{buttonName}</button>
    )
}

Button.propTypes={
    buttonName:PropTypes.string,
    disabled:PropTypes.bool
}

Button.defaultProps={
    buttonName:AppConstants.Nil,
    disabled:false
}

export default Button;