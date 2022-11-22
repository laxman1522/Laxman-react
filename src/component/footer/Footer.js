import "./Footer.scss";
import React from "react";
import { AppConstants } from "../../constants/appConstants";


const Footer = () => {

    return (
        <div className="footer">
            <div className="copy-rights">{AppConstants.CopyRights}</div>
        </div>
    )
}

export default Footer;