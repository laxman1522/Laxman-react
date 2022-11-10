import "./Button.scss";
import PropTypes from "prop-types";


/**
 * Button component - used for all the buttons in the website
 */
const Button = (props) =>{

    const {disableButton,buttonName,className}=props;

    /**
     * For passing the data to the parent component once the button is clicked
     */
    const buttonClicked = () => {
        buttonName!=="SHOP NOW" && props.buttonClicked();
    }

    return(
        <button  className={`button ${className}`} disabled={disableButton} onClick={buttonClicked}>{buttonName}</button>
    )
}

Button.propTypes={
    disableButton:PropTypes.bool,
    buttonName:PropTypes.string
}

Button.defaultProps = {
    disableButton:false,
    buttonName:"Error"
}

export default Button;
