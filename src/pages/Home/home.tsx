
import styles from './home.module.scss';
import Header from '../../components/Header/header';
import coverImage from '../../assets/sindel-background.png';
import { APPCONSTANTS } from '../../constants/appConstants';
import React, { memo } from 'react';
import Lottery from '../../components/Lottery/lottery';


const Home = () => {

    console.log("Home container");

    return(
        <React.Fragment>
            <Header ></Header>
            <img className={styles.coverImage} src={coverImage} alt={APPCONSTANTS.SINDEL_IMAGE}></img>
            <div className={styles.lotteryContainer}>
                <Lottery></Lottery>
            </div>
        </React.Fragment>  
    )
}

export default memo(Home);