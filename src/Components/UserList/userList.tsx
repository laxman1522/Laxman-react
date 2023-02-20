import "./userList.scss";
import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/userCard";


const UserList = () => {

    //INFO: destructuring the user details from the redux store/userDetails
    const { data} = useSelector((state: any) => {
        return state.userDetails;
    })

    //Mapping through the available users and returning the jsx for individual user in a card format 
    const userList = data.map((data:any) => {
        return <UserCard key={data?.id} id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    return (
        <React.Fragment>
            <div className="modal-title">Members</div>
                <div className="users-container">
                {userList}
            </div>
        </React.Fragment>
    )
}

export default UserList;