import "./sideBar.scss";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";
import { AppConstants } from "../../Constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import {  updateTypes } from "../../Stores";
import { ThemeContext } from "../../App";

/**
 * @description Component responsible for showing the APP title and available filters and menu options
 */
const SideBar: React.FC<any> = (props: any) => {

    //INFO: destructuring constants
    const {TITLE, FILTER, MENU_OPTIONS, TYPES} = AppConstants;

    const {showMembersModal} = props;

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();
    //INFO: destructuring function from context provider to call the function when user wants to toggle the theme
    const { theme, toggleTheme} = useContext(ThemeContext);
    const [type, setType] = useState<any>();

    const { types} = useSelector((state: any) => {
        return state.blogs;
    })

    useEffect(() => {
        types.includes("local") && setType("local")
    },[types])

    //INFO: useEffect for updating blog types
    useEffect(()=>{
        const types = TYPES;
        dispatch(updateTypes(types))
    },[TYPES, dispatch])

    //INFO:using Ref for capturing user inputs - selected Blog types 
    const regionalRef = useRef<any>();
    const nationalRef = useRef<any>();
    const internationalRef = useRef<any>();
    const localRef = useRef<any>();

    /**
     * @description To update the blog list based on the blog types selection
     */
    const updateTypeHandler = () => {
        const types = [];
        regionalRef.current.checked && types.push("regional");
        nationalRef.current.checked && types.push("national");
        internationalRef.current.checked && types.push("international");
        localRef?.current?.checked && types.push("local");
        dispatch(updateTypes(types))
    }

    //INFO: To update the modal state (open/close) based on the user action
    const toggleModal = () => {
       showMembersModal();
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
                    {type === "local" && checkBoxInputs("local",FILTER.BLOGS.LOCAL,localRef)}
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