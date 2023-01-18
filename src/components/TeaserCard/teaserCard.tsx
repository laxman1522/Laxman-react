import React, {memo, useRef, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import {  teaserDetails } from "../../modal/commonModel";
import styles from './teaserCard.module.scss';

const TeaserCard = (props: teaserDetails) => {

    console.log("Teaser Card");

    const teaserRef : any = useRef();

    const {title, videoSrc} = props.teaser;
    const [showAd, setShowAd] = useState(false);
    const [adRef, setAdRef] = useState(5);

    const startedPlaying = () => {
            teaserRef.current.paused && showAdvertisement()
    }

    const showAdvertisement = () => {
        setShowAd(true);
        let count = 5;
        const adInterval = setInterval(() => {
            count--;
            setAdRef(count);
            count === 0 && clearInterval(adInterval);
        }, 1000)

    }

    return (
        <React.Fragment>
            <div className={styles.teaserCardContainer} >
                <video src={videoSrc} ref={teaserRef} width="400" height="300" onClick={startedPlaying} controls ></video>
                <div className={props.className}>{title}</div>
                {showAd && <div className={styles.adMessage}>{APPCONSTANTS.ADVERTISEMENT} {adRef}</div> }
            </div>
        </React.Fragment>
    )
}

TeaserCard.defaultProps = {
    title: APPCONSTANTS.NIL,
    videoSrc: APPCONSTANTS.NIL
}

export default memo(TeaserCard);