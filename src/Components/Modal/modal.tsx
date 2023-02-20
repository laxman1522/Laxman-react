import "./modal.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../../Stores";
import { ElementAsChildren } from "../../model/common.model";

const Modal = ({children}: ElementAsChildren) => {

     //INFO: using useDispatch to dispatch actions to redux stores
    const dispatch = useDispatch<any>();

    const {isLoading} = useSelector((state: any) => {
        return state.userDetails;
    })

    //INFO: for toggling the modal state 
    const toggleModal = (event: any) => {
        event.target === document.querySelector(".modal") && dispatch(updateModalState(false));
    }

    return (
        <div className="modal" onClick={toggleModal}>
            <div className="modal-container">
                 {children}
                {isLoading && <div className="loader"></div>}
            </div>
        </div>
    )
}

export default Modal;