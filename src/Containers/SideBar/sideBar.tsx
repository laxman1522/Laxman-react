import "./sideBar.scss";
import React, { Ref, useContext, useEffect, useRef } from "react";
import { AppConstants } from "../../Constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import {  updateTypes, updateViewMembers } from "../../Stores";
import { fetchUsers } from "../../Stores/thunks/fetchUsers";
import { ThemeContext } from "../../App";

/**
 * @description Component responsible for showing the APP title and available filters and menu options
 */
const SideBar: React.FC = () => {

    //INFO: destructuring constants
    const {TITLE, FILTER, MENU_OPTIONS, TYPES} = AppConstants;

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();
    //INFO: destructuring function from context provider to call the function when user wants to toggle the theme
    const { theme, toggleTheme} = useContext(ThemeContext);

    //INFO: destructuring the user details from the redux store/userDetails
    const { data} = useSelector((state: any) => {
        return state.userDetails;
    })

    //INFO: useEffect for updating blog types
    useEffect(()=>{
        const types = TYPES;
        dispatch(updateTypes(types))
    },[TYPES, dispatch])

    //INFO:using Ref for capturing user inputs - selected Blog types 
    const regionalRef = useRef<any>();
    const nationalRef = useRef<any>();
    const internationalRef = useRef<any>();

    /**
     * @description To update the blog list based on the blog types selection
     */
    const updateTypeHandler = () => {
        const types = [];
        regionalRef.current.checked && types.push("regional");
        nationalRef.current.checked && types.push("national");
        internationalRef.current.checked && types.push("international");
        dispatch(updateTypes(types))
    }

    //INFO: To update the modal state (open/close) based on the user action
    const toggleModal = () => {
       data.length===0 ? dispatch(fetchUsers()) : dispatch(updateViewMembers(true));
    }

    /**
     * 
     * @description Function that takes classname,value & ref as a parameter and returns the jsx for custom checkbox inputs along with label
     */
    const checkBoxInputs = (className: string, value: string, ref: Ref<any>) => {
        return (
            <div className={className}>
                <label htmlFor={value} className="container">{value}
                <input ref={ref} type="checkbox" id={value} value={value} onChange={updateTypeHandler} defaultChecked></input>
                <span className="checkmark"></span></label>
            </div> 
        )
    }

    return (
        <div className="side-bar-container">
            <div className="title">{TITLE.FIRST_PART}<span className="second-part"> {TITLE.SECOND_PART}</span></div>
            <div className="filter">
                <div className="heading">{FILTER.HEADING.toLocaleUpperCase()}</div>
                <ul className="blogs">
                    {checkBoxInputs("regional",FILTER.BLOGS.REGIONAL,regionalRef)}
                    {checkBoxInputs("national",FILTER.BLOGS.NATIONAL,nationalRef)}
                    {checkBoxInputs("international",FILTER.BLOGS.INTERNATIONAL,internationalRef)}
                </ul>
            </div>
            <div className="options">
                <div className="view-members" onClick={toggleModal}>{MENU_OPTIONS.VIEW_MEMBERS}</div>
                <div className="dark-mode" onClick={toggleTheme}>{theme === "light" ? MENU_OPTIONS.DARK_MODE : MENU_OPTIONS.LIGHT_MODE}</div>
            </div>
        </div>
    )
}

export default SideBar;