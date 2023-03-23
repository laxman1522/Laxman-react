import "./userList.scss";
import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/userCard";
import { AppConstants } from "../../Constants/appConstants";
import { ApiConstants } from "../../Constants/apiConstants";
import axios from "axios";

let updatedUsersList: any = [];

const UserList = () => {

    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {
        const fetchUsers =  async () => {
            setLoading(true);
            const response = await axios.get(ApiConstants.users);
            updatedUsersList = response.data;
            setLoading(false);
        }

       updatedUsersList.length === 0 && fetchUsers();
    },[])

    //Mapping through the available users and returning the jsx for individual user in a card format 
    const userList = updatedUsersList.map((data:any) => {
        return <UserCard key={data?.id} id={data?.id} name={data?.name} company={data?.company?.name} photo={data?.photo}></UserCard>
    })

    return (
        <React.Fragment>
            {!loading && 
            <React.Fragment>
            <div className="modal-title">{AppConstants.MEMBERS}</div>
                <div className="users-container">
                {userList}
            </div> 
            </React.Fragment>}
            {loading && <div className="loader"></div>}
        </React.Fragment>
    )
}

export default UserList;