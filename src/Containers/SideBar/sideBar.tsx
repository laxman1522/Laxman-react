import "./sideBar.scss";
import React, { Ref, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppConstants } from "../../Constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import {  updateEditStatus, updateSearch, updateTypes } from "../../Stores";
import { ThemeContext } from "../../App";
import CustomCheckBox from "../../Components/customCheckBox/CustomCheckBox";
import { IndexType } from "typescript";
import Modal from "../../Components/Modal/modal";
import modal from "../../Components/Modal/modal";
import ModalWarning from "../../Components/modalWarning/modalWarning";

/**
 * @description Component responsible for showing the APP title and available filters and menu options
 */
const SideBar: React.FC<any> = (props: any) => {

    //INFO: destructuring constants
    const {TITLE, FILTER, MENU_OPTIONS, BLOGS, CUSTOM_TYPE,MODALS,CONFIRM, PRIMARY_BUTTON, SECONDARY_BUTTON} = AppConstants;

    const [availableTypes, setAvailableTypes] = useState<any>([]);

    const {showMembersModal, showWarningModal} = props;

    const [modal, setModal] = useState<any>('');
    const [checkBoxDetails, setCheckBoxDetails] = useState<any>();

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
        setModal(MODALS.WARNING_MODAL);
        setCheckBoxDetails({
            name: value,
            status: status,
            updatedTypes: updatedTypes
        })
    }
    }

    //INFO: To update the modal state (open/close) based on the user action
    const toggleUserModal = () => {
       showMembersModal();
    }

     //INFO: For closing the modal on backdrop
     const toggleModal = useCallback(() => {
        setModal('');
        setCheckBoxDetails({...checkBoxDetails,status:!checkBoxDetails.status})
    },[])

    //INFO: For closing the warning modal and updating the blog details if the user clicks continue in the warning pop up
    const continueHandler = () => {
            dispatch(updateEditStatus(false));
            dispatch(updateTypes(checkBoxDetails.updatedTypes));
            setModal(''); 
    }

     //INFO: For taking the user back to the edit mode once the user clicks cancel in the warning pop up
     const cancelHandler = () => {
        setModal('');
        setCheckBoxDetails({...checkBoxDetails,status:!checkBoxDetails.status})
    }


    const typesList = availableTypes.map((list: any, index: any) => {
            if(list === checkBoxDetails?.name && allowEdit) {
                return(
                    <CustomCheckBox key={index} checked={checkBoxDetails.status} className={list} value={list.charAt(0).toUpperCase() + list.slice(1) + " " + BLOGS} onchange={updateTypeHandler}></CustomCheckBox>
                )
            } else {
                return(
                    <CustomCheckBox key={index} className={list} value={list.charAt(0).toUpperCase() + list.slice(1) + " " + BLOGS} onchange={updateTypeHandler}></CustomCheckBox>
                )
            }
            
    })


    return (
        <React.Fragment>
        <div className="side-bar-container">
            <div className="title">{TITLE.FIRST_PART}<span className="second-part"> {TITLE.SECOND_PART}</span></div>
            <div className="filter">
                <div className="heading">{FILTER.HEADING.toLocaleUpperCase()}</div>
                <ul className="blogs">
                    {typesList}
                </ul>
            </div>
            <div className="options">
                <div className="view-members" onClick={toggleUserModal}>{MENU_OPTIONS.VIEW_MEMBERS}</div>
                <div className="dark-mode" onClick={toggleTheme}>{theme === "light" ? MENU_OPTIONS.DARK_MODE : MENU_OPTIONS.LIGHT_MODE}</div>
            </div>
        </div>
        <div className="warning-pop-up">
                {modal === MODALS.WARNING_MODAL && <Modal toggleModal={toggleModal}>
                        <ModalWarning message={CONFIRM} allow={continueHandler}  cancel={cancelHandler} primaryButton={PRIMARY_BUTTON}
                        secondaryButton={SECONDARY_BUTTON}></ModalWarning>
                    </Modal>}
            </div>
        </React.Fragment>
    )
}

export default SideBar;