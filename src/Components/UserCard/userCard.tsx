import "./userCard.scss";
import React, { useRef } from "react";
import oops from "../../assets/oops.png";

const UserCard = (props: any) => {

    const imageRef = useRef<any>();

    const {name,company,photo} = props;

    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    return(
        <div className="user-container">
            <img  ref={imageRef} className="user-image" src={`https://jsonmockserver.vercel.app/${photo}` || oops}
            onError={errorHandler} alt={name}></img>
            <div className="name">{name}</div>
            <div className="company">{company}</div>
        </div>
    )
}

export default UserCard;