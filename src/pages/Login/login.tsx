import React, {memo} from "react";
import Header from "../../components/Header/header";
import coverImage from '../../assets/sindel-background.png';
import styles from '../Home/home.module.scss';
import { APPCONSTANTS } from "../../constants/appConstants";
import LoginCard from "../../components/LoginCard/loginCard";

const Login: React.FC = () => {

    return(
        <React.Fragment>
            <Header></Header>
            <img className={styles.coverImage} src={coverImage} alt={APPCONSTANTS.SINDEL_IMAGE}></img>
            <LoginCard ></LoginCard>
        </React.Fragment>
    )
}

export default memo(Login);