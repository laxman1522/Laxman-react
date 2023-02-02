import styles from './nowWatching.module.scss';
import React, {memo} from "react";
import Header from "../../components/Header/header";
import { APPCONSTANTS } from '../../constants/appConstants';

const NowWatching: React.FC = () => {

    const {NOW_SHOWING, NOW_SHOWING_MOVIE_DETAILS} = APPCONSTANTS;

    return (
        <React.Fragment>
            <Header></Header>
            <div className={styles.nowShowingContainer}>
                <div className={styles.content}>
                    <div className={styles.nowShowing}>{NOW_SHOWING}</div>
                    <div className={styles.name}>{NOW_SHOWING_MOVIE_DETAILS.NAME}</div>
                    <iframe className={styles.movie} src={NOW_SHOWING_MOVIE_DETAILS.SRC} title="YouTube video player" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                    <div className={styles.description}>{NOW_SHOWING_MOVIE_DETAILS.DESCRIPTION}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(NowWatching);