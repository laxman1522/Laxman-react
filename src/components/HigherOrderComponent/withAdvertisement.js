import React, { useState,useEffect, useCallback } from "react";


const WithAdvertisement = (OriginalComponent ) => {

    const NewComponent = (props) => {

        const [timer, setTimer] = useState();
        const [message, setMessage] = useState();
        const [showAd, setShowAd] = useState(false);
        const [showAdImage, setShowAdImage] = useState(false);
    
        const startedPlaying = useCallback((adDetails) => {
            if(timer === undefined || timer ===0) {
                setTimer(adDetails.timer);
                setMessage(adDetails.message);
                setShowAd(true);
            }  
        },[timer])

        const showingAd = useCallback((adDetails) => {
            setTimer(adDetails.timer);
            setMessage(adDetails.message);
            setShowAdImage(true);
        },[])

        useEffect(() => {
            (showAdImage || showAd) && updateTimer();
        }, [showAdImage, showAd])
    
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
                 startedPlaying={startedPlaying} showingAd={showingAd}/>
            )
    }

    return NewComponent;

}

export default WithAdvertisement;