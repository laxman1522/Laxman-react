import "./modal.scss";
import React, { useRef } from "react";

const Modal:React.FC<any> = ({children, toggleModal}: any) => {

    const modalRef = useRef<any>('');

    //INFO: for toggling the modal state 
    const toggleModalHandler = (event: any) => {
        event.target === modalRef.current && toggleModal();
    }

    return (
        <div className="modal" ref={modalRef} onClick={toggleModalHandler}>
            <div className="modal-container">
                 {children}
            </div>
        </div>
    )
}

export default Modal;