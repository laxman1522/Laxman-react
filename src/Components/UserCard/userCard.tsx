import "./userCard.scss";
import React, { memo, useRef } from "react";
import oops from "../../assets/oops.png";
import PropTypes from "prop-types";
import { userCard } from "../../model/common.model";
import { AppConstants } from "../../Constants/appConstants";

/**
 * @description component responsible for returning jsx for individual user details in a card format
 */
const UserCard = (props: userCard) => {

    const imageRef = useRef<any>();

    //destructuring props
    const {name,company,photo} = props;

    const {SRC_PREFIX} = AppConstants

     //INFO: for updating the image with dummy image incase any error happens during the image rendering 
    const errorHandler = () => {
        imageRef.current.src = oops;
    }

    return(
        <div className="user-container">
            <div className="image"><img  ref={imageRef} className="user-image" src={`${SRC_PREFIX}${photo}` || oops}
            onError={errorHandler} alt={name}></img></div>
            <div className="name">{name}</div>
            <div className="company">{company}</div>
        </div>
    )
}

UserCard.propTypes = {
    name: PropTypes.string,
    company: PropTypes.string,
    photo: PropTypes.string,
    id: PropTypes.number
}

UserCard.defaultTypes = {
    name: "",
    company: "",
    photo: "",
    id: 0
}

export default memo(UserCard);