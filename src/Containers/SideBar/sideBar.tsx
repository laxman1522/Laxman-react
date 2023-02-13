import "./sideBar.scss";
import React from "react";
import { AppConstants } from "../../Constants/appConstants";

const SideBar: React.FC<any> = () => {

    const {TITLE, FILTER, MENU_OPTIONS} = AppConstants

    return (
        <div className="side-bar-container">
            <div className="title">{TITLE.FIRST_PART}<span className="second-part"> {TITLE.SECOND_PART}</span></div>
            <div className="filter">
                <div className="heading">{FILTER.HEADING.toLocaleUpperCase()}</div>
                <ul className="blogs">
                    <div className="regional">
                        <label htmlFor={FILTER.BLOGS.REGIONAL} className="container">{FILTER.BLOGS.REGIONAL}
                        <input type="checkbox" id={FILTER.BLOGS.REGIONAL} value={FILTER.BLOGS.REGIONAL} checked></input>
                        <span className="checkmark"></span></label>
                    </div>
                    <div className="national">
                        
                        <label htmlFor={FILTER.BLOGS.NATIONAL} className="container">{FILTER.BLOGS.NATIONAL}
                        <input type="checkbox" id={FILTER.BLOGS.NATIONAL} value={FILTER.BLOGS.NATIONAL} checked></input>
                        <span className="checkmark"></span></label>
                    </div>
                    <div className="international">   
                        <label htmlFor={FILTER.BLOGS.INTERNATIONAL} className="container">{FILTER.BLOGS.INTERNATIONAL}
                        <input type="checkbox" id={FILTER.BLOGS.INTERNATIONAL} value={FILTER.BLOGS.INTERNATIONAL} checked></input>
                        <span className="checkmark"></span></label>
                    </div>
                </ul>
            </div>
            <div className="options">
                <div className="view-members">{MENU_OPTIONS.VIEW_MEMBERS}</div>
                <div className="dark-mode">{MENU_OPTIONS.DARK_MODE}</div>
            </div>
        </div>
    )
}

export default SideBar;