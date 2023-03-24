import React from "react";

const CustomCheckBox = (props: any) => {

    const {className, value, onchange} = props;

    const onChangeHandler = (event: any) => {
        onchange(className, event.target.checked);
    }

    return (
        <div className={className}>
            <label htmlFor={value} className="container">{value}
            <input type="checkbox" id={value} value={value} onChange={onChangeHandler} defaultChecked></input>
            <span className="checkmark"></span></label>
        </div> 
    )
}

export default CustomCheckBox;