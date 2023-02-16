import "./modal.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../../Stores";
import UserCard from "../UserCard/userCard";
import { ElementAsChildren } from "../../model/common.model";

const Modal = ({children}: ElementAsChildren) => {

console.log(children)
    const dispatch = useDispatch<any>();

    const {isLoading, data, error, isModalOpen} = useSelector((state: any) => {
        return state.userDetails;
    })

    const userList = data.map((data:any) => {
        return <UserCard id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    const toggleModal = () => {
        dispatch(updateModalState(false));
    }

    return (
        <div className="modal" onClick={toggleModal}>
            <div className="modal-container">
                {children}
            </div>
        </div>
    )
}

export default Modal;