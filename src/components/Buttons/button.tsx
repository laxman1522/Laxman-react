import styles from "./button.module.scss";
import React, {memo} from "react";
import { button } from "../../modal/commonModel";
import { APPCONSTANTS } from "../../constants/appConstants";

/**
 * Custom button component
 */
const Button = (props: button) => {

    //INFO: for indicating the parent component on button click
    const buttonClickHandler = () => {
        props.buttonClickHandler();
    }

    return (
        <button className={`${styles.btn} ${props.className}`} disabled={props.disabled} onClick={buttonClickHandler}>{props.buttonName}</button>
    )
}

Button.defaultProps = {
    buttonName: APPCONSTANTS.NIL,
    buttonClickHandler: (() => {})
}

export default memo(Button);