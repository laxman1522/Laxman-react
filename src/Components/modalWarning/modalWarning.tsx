import React from "react";
import Button from "../Button/button";
import PropTypes from "prop-types";

const ModalWarning = (props: any) => {

    const {message, allow, cancel, primaryButton, secondaryButton} = props;

    //INFO: For closing the warning modal and updating the blog details if the user clicks continue in the warning pop up
    const continueHandler = () => {
        allow();
    }

    //INFO: For taking the user back to the edit mode once the user clicks cancel in the warning pop up
    const editHandler = () => {
        cancel();
    }

    return (
        <div className="warning">
            <div className="message">{message} </div>
            <div className="button">
                <Button buttonName={secondaryButton} buttonClicked={editHandler} className={secondaryButton.toLowerCase()}></Button>
                <Button buttonName={primaryButton} buttonClicked={continueHandler} className={primaryButton.toLowerCase()}></Button>
            </div>
        </div>
    )
}

ModalWarning.propTypes = {
    message: PropTypes.string,
    allow: PropTypes.func,
    cancel: PropTypes.func,
    primaryButton: PropTypes.string,
    secondaryButton: PropTypes.string
}

ModalWarning.defaultProps = {
    message: '',
    allow: () => {},
    cancel: () => {},
    primaryButton: '',
    secondaryButton: ''
}

export default ModalWarning;