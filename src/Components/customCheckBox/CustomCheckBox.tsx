import React, { useEffect, useRef } from "react";

const CustomCheckBox = (props: any) => {

    const {className, value, onchange, checked} = props;

    const inputRef = useRef<any>();

    useEffect(() => {
        if(checked !== undefined) {
            inputRef.current.checked = checked;
        }
    },[checked])

    const onChangeHandler = (event: any) => {
        onchange(className, event.target.checked);
    }


    return (
        <div className={className}>
            <label htmlFor={value} className="container">{value}
            <input type="checkbox" ref={inputRef} id={value} value={value} onChange={onChangeHandler} defaultChecked></input>
            <span className="checkmark"></span></label>
        </div> 
    )
}

export default CustomCheckBox;