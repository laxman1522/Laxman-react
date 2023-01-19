import React, { Component, useEffect, useState } from "react";

const TimerComponent = (props) => {

    const [adTimer, setAdTimer] = useState(props.timerDetails.timer);

    const minuteConverter = (time) => {
        let minutes = Math.floor(time/ 60);
        let seconds = time- minutes * 60;
        seconds = seconds <= 10 ? `0${seconds}` : seconds;
        return `0${minutes}:${seconds}`
    }

    useEffect(() => {    
        setAdTimer(minuteConverter(props.timerDetails.timer));
        updateTimer();
    }, [props])

    const updateTimer = () => {
        let timer = props.timerDetails.timer;
        const interval = setInterval(() => {
            --timer;
            setAdTimer(minuteConverter(timer));
            if(timer === 0) {
                clearInterval(interval);
                props.timeout(props.timerDetails.timer);
            }
        }, 1000)
    }

    return (
        <div className={props.className}>{props.timerDetails.message}{adTimer}</div>
    )
}

export default TimerComponent;