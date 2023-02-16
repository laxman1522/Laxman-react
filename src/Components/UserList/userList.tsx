import "./userList.scss";
import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/userCard";
import Modal from "../Modal/modal";


const userList = () => {

    const {isLoading, data, error, isModalOpen} = useSelector((state: any) => {
        return state.userDetails;
    })

    const userList = data.map((data:any) => {
        return <UserCard id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    return(
        <Modal>
            <div className="title">Members</div>
        </Modal>
    )
}

export default userList;