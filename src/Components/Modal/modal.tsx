import "./modal.scss";
import React from "react";

const Modal:React.FC<any> = ({children, toggleModal}: any) => {

    //INFO: for toggling the modal state 
    const toggleModalHandler = (event: any) => {
        event.target === document.querySelector(".modal") && toggleModal();
    }

    return (
        <div className="modal" onClick={toggleModalHandler}>
            <div className="modal-container">
                 {children}
            </div>
        </div>
    )
}

export default Modal;