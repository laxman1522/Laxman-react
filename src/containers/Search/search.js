import "./search.scss";
import React, { useEffect, useRef } from "react";
import { AppConstants } from "../../constants/appConstants";
import { memo } from "react";
import PropTypes from "prop-types";
import CustomInput from "../../components/CustomInput/customInput";

/**
 *  Allows the user to search for the destination
 */
const Search = (props) => {

    console.log("Container - Destination Search container");

    const {searchDestination} = props;

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focusInput();
    },[])

    //To pass the entered destination value through props on click of enter
    const searchDestinationHandler = (event) => {
        if(event.keyCode === 13) {
            searchDestination(inputRef.current.enteredValue(),AppConstants.SEARCHED);
            inputRef.current.clearInput();
        } 
    }
    return(
        <div className="search-container">
            <div className="search-heading">{AppConstants.SEARCH_HEADING}</div>
            <div className="search-sub-heading-one">{AppConstants.SEARCH_SUBHEADING_ONE}</div>
            <div className="search-sub-heading-two">{AppConstants.SEARCH_SUBHEADING_TWO}</div>
            {/* <input ref={inputRef} type="text" placeholder={AppConstants.SEARCH_PLACEHOLDER} onKeyUp={searchDestinationHandler}></input> */}
            <CustomInput ref={inputRef} type="text" placeholder={AppConstants.SEARCH_PLACEHOLDER} onKeyUp={searchDestinationHandler}></CustomInput>
        </div>
    )
}

Search.propTypes = {
    searchDestination: PropTypes.func
}

Search.defaultProps = {
    searchDestination: () => {}
}

export default memo(Search);