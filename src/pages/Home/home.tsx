
import styles from './home.module.scss';
import Header from '../../components/Header/header';
import coverImage from '../../assets/sindel-background.png';
import { APPCONSTANTS } from '../../constants/appConstants';
import React, { memo, useEffect, useState } from 'react';
import Lottery from '../../components/Lottery/lottery';
import ErrorBoundary from '../../components/ErrorBoundary/errorBoundary';
import Trailer from '../../components/Trailer/trailer';
import Teasers from '../../components/Teasers/teasers';
import Language from '../../components/Languages/language';


const Home: React.FC = () => {

        useEffect(() => {

        },[])

        const [errorOccured, setErrorOccured] = useState(false);

        return(
        <React.Fragment>
            <Header ></Header>
            <img className={styles.coverImage} src={coverImage} alt={APPCONSTANTS.SINDEL_IMAGE}></img>
            <div className={styles.lotteryContainer}>
                <ErrorBoundary className = {styles.error}>
                    <Lottery errorOccured={() => {setErrorOccured(true)}} error={errorOccured}/>
                </ErrorBoundary>
            </div>
            <div className={styles.trailerContainer}>
                <Trailer></Trailer>
                <Teasers></Teasers>
                <Language></Language>
            </div>
        </React.Fragment>  
    )
}

export default memo(Home);