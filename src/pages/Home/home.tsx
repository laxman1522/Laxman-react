
import styles from './home.module.scss';
import coverImage from '../../assets/sindel-background.png';
import { APPCONSTANTS } from '../../constants/appConstants';
import React, { memo } from 'react';
import Lottery from '../../components/Lottery/lottery';
import ErrorBoundary from '../../components/ErrorBoundary/errorBoundary';
import Trailer from '../../components/Trailer/trailer';
import Teasers from '../../components/Teasers/teasers';
import Language from '../../components/Languages/language';


const Home: React.FC = () => {


        return(
        <React.Fragment>
            <img className={styles.coverImage} src={coverImage} alt={APPCONSTANTS.SINDEL_IMAGE}></img>
            <div className={styles.lotteryContainer}>
                <ErrorBoundary className = {styles.error}>
                    <Lottery />
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