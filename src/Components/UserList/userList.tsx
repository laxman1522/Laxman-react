import "./userList.scss";
import React from "react";
import UserCard from "../UserCard/userCard";
import { AppConstants } from "../../Constants/appConstants";

const UserList: React.FC<any> = (props: any) => {

    const {userData} = props

    //Mapping through the available users and returning the jsx for individual user in a card format 
    const userList = userData.map((data:any) => {
        return <UserCard key={data?.id} id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    return (
            <React.Fragment>
            <div className="modal-title">{AppConstants.MEMBERS}</div>
                <div className="users-container">
                {userList}
            </div> 
            </React.Fragment>
    )
}

export default UserList;