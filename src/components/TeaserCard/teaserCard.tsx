import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import {  teaserDetails } from "../../modal/commonModel";
import styles from './teaserCard.module.scss';
import adImage from '../../assets/Advertisement-Small-2.png';
import UpdatedComponent from "../HigherOrderComponent/withAdvertisement";
import TimerComponent from "../TimerComponent/timerComponent";
import WithAdvertisement from "../HigherOrderComponent/withAdvertisement";


const adDetails = {
    message: APPCONSTANTS.ADVERTISEMENT,
    timer: 5
}

const resumeDetails = {
    message: APPCONSTANTS.VIDEO_RESUMES,
    timer: 2
}

const TeaserCard: React.FC<teaserDetails> = (props: teaserDetails) => {

    const teaserRef : any = useRef();

    const {title, videoSrc} = props?.teaser;
    const {timer,message, startedPlaying, showAd, showAdImage, showingAd} = props;

    if(message === APPCONSTANTS.ADVERTISEMENT && timer === 0) {
        teaserRef.current.pause();
        teaserRef.current.style.display = "none";
        showingAd(resumeDetails);
    } else if (message === APPCONSTANTS.VIDEO_RESUMES && timer === 0){
        teaserRef.current.style.display = "block";
        teaserRef?.current?.play();
    }

    const videoStateChanged = useCallback(() => {
            if(teaserRef.current.paused && teaserRef.current.currentTime === 0) {
                startedPlaying(adDetails);
            }
    },[])

    const minuteConverter = (time : any) => {
        let minutes = Math.floor(time/ 60);
        let seconds: number | string = time- minutes * 60;
        seconds = seconds <= 10 ? `0${seconds}` : seconds;
        return `0${minutes}:${seconds}`
    }

    return (
        <React.Fragment>
            <div className={styles.teaserCardContainer} >
                {showAdImage && <img width="400" height="300" src={adImage} alt="adImage"></img>}
                <video src={videoSrc} ref={teaserRef} width="400" height="300" onClick={videoStateChanged} controls ></video>
                <div className={props.className}>{title}</div>
                {showAd && <div className={styles.adMessage}>{message}{minuteConverter(timer)}</div>}
            </div>
        </React.Fragment>
    )
}

TeaserCard.defaultProps = {
    timer : undefined,
    message: '',
    startedPlaying: () => {},
    showAd: false, 
    showAdImage: false, 
    showingAd:() => {},
}

export default WithAdvertisement(TeaserCard);