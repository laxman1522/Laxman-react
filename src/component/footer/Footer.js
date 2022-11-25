import "./Footer.scss";
import React from "react";
import { AppConstants } from "../../constants/appConstants";

/**
 * 
 * @returns Footer component - responsible for footer content
 */
const Footer = () => {

    return (
        <div className="footer">
            <div className="copy-rights">{AppConstants.CopyRights}</div>
        </div>
    )
}

export default Footer;