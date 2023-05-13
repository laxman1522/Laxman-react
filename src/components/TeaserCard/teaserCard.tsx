import React, { useEffect, useRef} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import {  teaserDetails } from "../../modal/commonModel";
import styles from './teaserCard.module.scss';
import adImage from '../../assets/Advertisement-Small-2.png';
import WithAdvertisement from "../HigherOrderComponent/withAdvertisement";
import play from "../../assets/Play.png";
import HOC from "../HigherOrderComponent/hoc";

//INFO: Ad details 
const adDetails = {
    message: APPCONSTANTS.ADVERTISEMENT,
    timer: 5
}

//INFO: Ad resume timing details 
const resumeDetails = {
    message: APPCONSTANTS.VIDEO_RESUMES,
    timer: 2
}

/**
 * 
 * @param props 
 * @returns Jsx responsible for showing individual teasers
 */
const TeaserCard: React.FC<teaserDetails> = (props: teaserDetails) => {

    //INFO: using reference for handling video pause and play
    const teaserRef : any = useRef();
    const imageRef: any = useRef();

    //INFO: destructuring props
    const {title, videoSrc} = props?.teaser;
    const {timer,message, startedPlaying, showAd, showAdImage, showingAd, teaserTime} = props;

    //INFO: logic for dynamically pause & play the video based on the ad details and timings
    if(message === APPCONSTANTS.ADVERTISEMENT && timer < 0) {
        teaserRef.current.pause();
        teaserRef.current.style.display = "none";
        imageRef.current.style.display = "none";
        showingAd(resumeDetails);
    } else if (message === APPCONSTANTS.VIDEO_RESUMES && timer < 0){
        teaserRef.current.style.display = "block";
        teaserRef?.current?.play();
    }

    //INFO: to pass the ad details once the user start playing the video
    const videoStateChanged = () => {
        teaserRef.current.play();
    }

    useEffect(()=>{
        let interval:any;
        if(message!==resumeDetails.message && (timer > -1 ) && (teaserRef?.current?.currentTime < adDetails.timer+1)) {
            interval = setInterval (() => {
                teaserTime(Math.floor(teaserRef?.current?.currentTime), adDetails);
            },1000)
        } 
        return(() => {
            clearInterval(interval);
        })
    },[timer])

    //INFO: for converting the time duration to seconds 
    const minuteConverter = (time : any) => {
        let minutes = Math.floor(time/ 60);
        let seconds: number | string = time- minutes * 60;
        seconds = seconds <= 10 ? `0${seconds}` : seconds;
        return `0${minutes}:${seconds}`
    }

    const videoPlayed = () => {
        imageRef.current.style.display = "none";
        if( teaserRef.current.currentTime < adDetails.timer ) {
            teaserTime(Math.floor(teaserRef?.current?.currentTime), adDetails);
        }
    }

    const videoPaused = () => {
        if(imageRef.current?.style) {
            imageRef.current.style.display =  "";
        }
    }

    return (
        <React.Fragment>
            <div className={styles.teaserCardContainer} >
                {showAdImage && <img width="400" height="300" src={adImage} alt="adImage"></img>}
                <video src={videoSrc} ref={teaserRef} width="400" height="300" controls onPlay={videoPlayed} onChange={videoStateChanged} onPause={videoPaused}
                poster={props.poster} ></video>
                <div className={props.className}>{title}</div>
                {showAd && <div className={styles.adMessage}>{message}{minuteConverter(timer)}</div>}
                {!showAdImage && <img className={styles.play} ref={imageRef} src={play} alt="play button" onClick={videoStateChanged} ></img>}
            </div>
        </React.Fragment>
    )
}


//INFO: default props
TeaserCard.defaultProps = {
    timer : undefined,
    message: '',
    startedPlaying: () => {},
    showAd: false, 
    showAdImage: false, 
    showingAd:() => {},
}

export default HOC(TeaserCard);