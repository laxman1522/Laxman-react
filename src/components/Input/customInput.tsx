import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
// import { customInput } from '../../modal/commonModel';


const CustomInput = (props: any, ref : any) => {

    const inputRef = useRef(ref);

    useImperativeHandle(ref, () => {
        return { 
                enteredValue: () => inputRef.current.value};
    },[props])

    return(
        <input ref={inputRef} {...props}></input>
    )
}

export default React.forwardRef( CustomInput );