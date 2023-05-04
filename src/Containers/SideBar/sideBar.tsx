import "./sideBar.scss";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";
import { AppConstants } from "../../Constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import {  updateTypes } from "../../Stores";
import { ThemeContext } from "../../App";
import CustomCheckBox from "../../Components/customCheckBox/CustomCheckBox";
import { IndexType } from "typescript";

/**
 * @description Component responsible for showing the APP title and available filters and menu options
 */
const SideBar: React.FC<any> = (props: any) => {

    //INFO: destructuring constants
    const {TITLE, FILTER, MENU_OPTIONS, BLOGS, CUSTOM_TYPE} = AppConstants;

    const [availableTypes, setAvailableTypes] = useState<any>([]);

    const {showMembersModal, showWarningModal} = props;

    //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();
    //INFO: destructuring function from context provider to call the function when user wants to toggle the theme
    const { theme, toggleTheme} = useContext(ThemeContext);

    const { types, allowEdit} = useSelector((state: any) => {
        return state.blogs;
    })

    useEffect(() => {
        availableTypes.length === 0 && setAvailableTypes(types);
        if(types.includes(CUSTOM_TYPE.toLowerCase()) && !availableTypes.includes(CUSTOM_TYPE.toLowerCase())) {
             setAvailableTypes([...availableTypes, CUSTOM_TYPE.toLowerCase()])
        } 
    },[types, availableTypes])
    
    /**
     * @description To update the blog list based on the blog types selection
     */
    const updateTypeHandler = (value: string, status: boolean) => {     
        let updatedTypes: Array<any> = [...types];
        if(status) {
           !updatedTypes.includes(value) && (updatedTypes = [...updatedTypes, value])
        } else {
            const index = updatedTypes.indexOf(value);
            updatedTypes.splice(index,1);
        }
    if(!allowEdit) {
        dispatch(updateTypes(updatedTypes))
    } else {
        showWarningModal({
            interaction: "blogTypes",
            data: updatedTypes
        })
    }
    }

    //INFO: To update the modal state (open/close) based on the user action
    const toggleModal = () => {
       showMembersModal();
    }


    const typesList = availableTypes.map((list: any, index: any) => {
        return(
            <CustomCheckBox key={index} className={list} value={list.charAt(0).toUpperCase() + list.slice(1) + " " + BLOGS} onchange={updateTypeHandler}></CustomCheckBox>
        )
    })


    return (
        <div className="side-bar-container">
            <div className="title">{TITLE.FIRST_PART}<span className="second-part"> {TITLE.SECOND_PART}</span></div>
            <div className="filter">
                <div className="heading">{FILTER.HEADING.toLocaleUpperCase()}</div>
                <ul className="blogs">
                    {typesList}
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