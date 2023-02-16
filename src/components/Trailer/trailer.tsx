import styles from "./trailer.module.scss";
import React, {memo, useCallback, useContext} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import trailerImage from '../../assets/sindel-background.png';
import Button from "../Buttons/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
import { userDetailsContext } from "../../App";

/**
 * @description for showing the trailer section
 */
const Trailer: React.FC = () => {

    const navigate = useNavigate();
    const {userDetails, setUserDetails} = useContext(userDetailsContext);

    const {TRAILERS, NEED_TO_SIGN_IN, SIGN_IN, SINDEL_IMAGE, TRAILER_TITLE, TRAILER_DESCRIPTION, WATCH_NOW} = APPCONSTANTS;

    const watchNowHandler = useCallback(() => {
            userDetails ? navigate(ROUTE_CONSTANTS.NOW_SHOWING) : navigate(ROUTE_CONSTANTS.LOGIN);
    },[])

    return (
        <React.Fragment>
            <div className={styles.trailerContainer}>
                    <div className={styles.trailerSignIn}>
                        <div className={styles.trailer}>{TRAILERS}</div>
                        <div className={styles.signin}>{NEED_TO_SIGN_IN}. 
                            <NavLink className={styles.siginLink} to={ROUTE_CONSTANTS.LOGIN}>{SIGN_IN}</NavLink>
                        </div>
                    </div>
                    <div className={`${styles.imageDescription} d-flex`}>
                        <div className={styles.trailerImageContainer}></div>
                        <img src={trailerImage} className={styles.trailerImage} alt={SINDEL_IMAGE}></img>
                        <div className={styles.trailerDetails}>
                            <div className={styles.trailerTitle}>{TRAILER_TITLE}</div>
                            <div className={styles.description}>{TRAILER_DESCRIPTION}</div>
                            <Button className={styles.btn} buttonName={WATCH_NOW} buttonClickHandler={watchNowHandler}></Button>
                        </div>
                    </div>
            </div>
        </React.Fragment>
    )
}

export default memo(Trailer);