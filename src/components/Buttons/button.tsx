import styles from "./button.module.scss";
import React, {memo} from "react";
import { button } from "../../modal/commonModel";
import { APPCONSTANTS } from "../../constants/appConstants";


const Button = (props: button) => {

    console.log("Button container");

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