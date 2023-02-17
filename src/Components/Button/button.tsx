import React from "react";


const Button = (props: any) => {

    const buttonClickHandler = () => {
        props.buttonClicked();
    }

    return (
        <button onClick={buttonClickHandler} className={props.className}> {props.buttonName}</button>
    )
}

export default Button;