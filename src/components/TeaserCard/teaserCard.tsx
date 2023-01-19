import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import {  teaserDetails } from "../../modal/commonModel";
import TimerComponent from "../TimerComponent/timerComponent";
import UpdatedComponent from "../TimerComponent/timerComponent";
import styles from './teaserCard.module.scss';
import adImage from '../../assets/Advertisement-Small-2.png';

let adDetails = {
    message: APPCONSTANTS.ADVERTISEMENT,
    timer: 5,
    showAd: false
}

const resumeDetails = {
    message: APPCONSTANTS.VIDEO_RESUMES,
    timer: 2,
    showAd: true
}

const TeaserCard = (props: teaserDetails) => {

    console.log("Teaser Card");

    const teaserRef : any = useRef();

    const {title, videoSrc} = props.teaser;
    const [timerDetails, setTimerDetails] = useState(adDetails);
    const [showAd, setShowAd] = useState(false);
    const [showAdImage, setShowAdImage] = useState(false);

    const startedPlaying = () => {
       if(teaserRef.current.paused) {
            setShowAd(true);
       }
    }

    const timeout = useCallback((duration: number) => {
        if(duration === adDetails.timer) {
            teaserRef.current.pause();
            teaserRef.current.style.display = "none";
            setShowAdImage(true);
            setTimerDetails(resumeDetails);
        } else {
            setShowAdImage(false);
            setShowAd(false);
            teaserRef.current.style.display = "block";
            teaserRef?.current?.play();
        }
    },[])

    return (
        <React.Fragment>
            <div className={styles.teaserCardContainer} >
                {showAdImage && <img width="400" height="300" src={adImage} alt="adImage"></img>}
                <video src={videoSrc} ref={teaserRef} width="400" height="300" onClick={startedPlaying} controls ></video>
                <div className={props.className}>{title}</div>
                {showAd && <TimerComponent className={styles.adMessage} timerDetails = {timerDetails} timeout={timeout}></TimerComponent> }
            </div>
        </React.Fragment>
    )
}

TeaserCard.defaultProps = {
    title: APPCONSTANTS.NIL,
    videoSrc: APPCONSTANTS.NIL
}

export default memo(TeaserCard);