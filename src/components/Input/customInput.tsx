import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { customInput } from '../../modal/commonModel';

/**
 * 
 * @param props 
 * @param ref 
 * @description for handling and showing the input field
 */
const CustomInput = (props: customInput, ref : any) => {

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

export default forwardRef(CustomInput );