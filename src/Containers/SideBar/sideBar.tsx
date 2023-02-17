import "./sideBar.scss";
import React, { useEffect, useRef } from "react";
import { AppConstants } from "../../Constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState, updateTypes, updateViewMembers } from "../../Stores";
import { fetchUsers } from "../../Stores/thunks/fetchUsers";

const SideBar: React.FC<any> = () => {

    const {TITLE, FILTER, MENU_OPTIONS} = AppConstants;

    const dispatch = useDispatch<any>();

    const { data} = useSelector((state: any) => {
        return state.userDetails;
    })

    useEffect(()=>{
        const types = ["regional","national", "international"]
        dispatch(updateTypes(types))
    },[])

    const regionalRef = useRef<any>();
    const nationalRef = useRef<any>();
    const internationalRef = useRef<any>();

    const updateTypeHandler = () => {
        const types = [];
        regionalRef.current.checked && types.push("regional");
        nationalRef.current.checked && types.push("national");
        internationalRef.current.checked && types.push("international");
        dispatch(updateTypes(types))
    }

    const toggleModal = () => {
       data.length===0 ? dispatch(fetchUsers()) : dispatch(updateViewMembers(true));
    }

    return (
        <div className="side-bar-container">
            <div className="title">{TITLE.FIRST_PART}<span className="second-part"> {TITLE.SECOND_PART}</span></div>
            <div className="filter">
                <div className="heading">{FILTER.HEADING.toLocaleUpperCase()}</div>
                <ul className="blogs">
                    <div className="regional">
                        <label htmlFor={FILTER.BLOGS.REGIONAL} className="container">{FILTER.BLOGS.REGIONAL}
                        <input ref={regionalRef} type="checkbox" id={FILTER.BLOGS.REGIONAL} value={FILTER.BLOGS.REGIONAL} 
                        onChange={updateTypeHandler} defaultChecked></input>
                        <span className="checkmark"></span></label>
                    </div>
                    <div className="national">     
                        <label htmlFor={FILTER.BLOGS.NATIONAL} className="container">{FILTER.BLOGS.NATIONAL}
                        <input ref={nationalRef} type="checkbox" id={FILTER.BLOGS.NATIONAL} value={FILTER.BLOGS.NATIONAL} 
                         onChange={updateTypeHandler} defaultChecked></input>
                        <span className="checkmark"></span></label>
                    </div>
                    <div className="international">   
                        <label htmlFor={FILTER.BLOGS.INTERNATIONAL} className="container">{FILTER.BLOGS.INTERNATIONAL}
                        <input ref={internationalRef} type="checkbox" id={FILTER.BLOGS.INTERNATIONAL} value={FILTER.BLOGS.INTERNATIONAL} 
                         onChange={updateTypeHandler} defaultChecked></input>
                        <span className="checkmark"></span></label>
                    </div>
                </ul>
            </div>
            <div className="options">
                <div className="view-members" onClick={toggleModal}>{MENU_OPTIONS.VIEW_MEMBERS}</div>
                <div className="dark-mode">{MENU_OPTIONS.DARK_MODE}</div>
            </div>
        </div>
    )
}

export default SideBar;