/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect, useCallback } from "react";

/**
 * 
 * @param {*} OriginalComponent 
 * @description Higher order component for performing same actions in teaser card and movie details component
 */
const WithAdvertisement = (OriginalComponent ) => {

    const NewComponent = (props) => {

        let timeout;
        //Maintaining state for message, timer, showAd and showAdImage
        const [timer, setTimer] = useState();
        const [message, setMessage] = useState();
        const [showAd, setShowAd] = useState(false);
        const [showAdImage, setShowAdImage] = useState(false);
        const [count, setCount] = useState(0);
        const [initialTime, setInitialTime] = useState();
    
        //INFO: For starting the timer once the video is started playing
        const startedPlaying = useCallback((adDetails) => {
            if(!showAdImage) {
                setInitialTime(adDetails.timer);
                setTimer(adDetails.timer);
                setMessage(adDetails.message);
                setShowAd(true);
                setCount(1);
            }   
        },[timer])

        useEffect(()=>{
            if(timer >= 0 && !showAdImage) {
                timeout = setTimeout(() => {
                    setTimer(initialTime-(count));
                    setCount(count+1)
                },1000)
            }  
            return(() => {
                clearTimeout(timeout);
            }) 
        },[timer, count, initialTime])

        const teaserTime = (time, adDetails) => {
                setTimer(adDetails.timer - time);
                setMessage(adDetails.message);
                setShowAd(true);
        }

        //INFO: For showing the ad image once the timer reaches 0
        const showingAd = useCallback((adDetails) => {
            setTimer(adDetails.timer);
            setMessage(adDetails.message);
            setShowAdImage(true);
        },[])

        //INFO: useeffect for conditionally showing the ad & calling the update timer function
        useEffect(() => {
            if(props.teaser) {
                (showAdImage) && updateTimer();
            } else {
                (showAdImage) && updateTimer();
            }
        }, [showAdImage, showAd])
    
        //INFO: For updating the timer on every seconds
        const updateTimer = () => {
            let timerValue = timer;
            const interval = setInterval(()=>{
                timerValue--;
                setTimer(timerValue);
                if(timerValue === 0) {
                    clearInterval(interval);
                    showAdImage && setShowAdImage(false);
                    showAdImage && setShowAd(false);
                }
            }, 1000)
        }   

            return(
                <OriginalComponent {...props} timer={timer} message={message} showAdImage={showAdImage} showAd={showAd}
                 startedPlaying={startedPlaying} showingAd={showingAd} teaserTime={teaserTime}/>
            )
    }

    return NewComponent;

}

export default WithAdvertisement;