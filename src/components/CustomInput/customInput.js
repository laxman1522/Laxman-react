import { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from "prop-types";
import { AppConstants } from '../../constants/appConstants';

const CustomInput = (props, ref) => {

    const inputRef = useRef();

    useImperativeHandle(ref, () => {
        return {focusInput: () => inputRef.current.focus(), 
                enteredValue: () => inputRef.current.value, 
                clearInput: () => inputRef.current.value = '' };
    },[props])

    return(
        <input ref={inputRef} {...props}></input>
    )
}

CustomInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string
}

CustomInput.propTypes = {
    type: 'text',
    placeholder: AppConstants.NIL
}

export default forwardRef(CustomInput);