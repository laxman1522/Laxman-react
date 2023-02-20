import React, { memo } from "react";
import PropTypes from "prop-types";
import { buttonProps } from "../../model/common.model";

/**
 * @description Component responsible for returning jsx for button compoennt
 */
const Button = (props: buttonProps) => {

    const {className, buttonName, buttonClicked} = props;

    //INFO: for passing the props to parent component on button click
    const buttonClickHandler = () => {
        buttonClicked();
    }

    return (
        <button onClick={buttonClickHandler} className={className}> {buttonName}</button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    buttonName: PropTypes.string,
    buttonClicked: PropTypes.func
}

Button.defaultProps = {
    className: "",
    buttonName: "",
    buttonClicked: ()=>{}
}

export default memo(Button);