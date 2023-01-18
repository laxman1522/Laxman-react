import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from "prop-types";
import { customInput } from '../../modal/commonModel';
import { APPCONSTANTS } from '../../constants/appConstants';


const CustomInput = (props: customInput, ref : any) => {

    console.log("Custom Input", props);

    const inputRef = useRef(ref);

    useImperativeHandle(ref, () => {
        return { 
                enteredValue: () => inputRef.current.value,
                clearInput: () => inputRef.current.value = '' };
    },[props])

    return(
        <input ref={inputRef} {...props}></input>
    )
}


// CustomInput.defaultProps = {
//     type: APPCONSTANTS.DEFAULT_INPUT_TYPE,
//     placeholder: APPCONSTANTS.NIL,
//     maxLength: APPCONSTANTS.MOBILE_MAX_LENGTH ,
//     onKeyUp: () => {},
//     onKeyDown: () => {},
//     className: APPCONSTANTS.NIL ,
//     ref: undefined
// }

export default forwardRef(CustomInput );