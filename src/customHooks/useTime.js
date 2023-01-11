import React, {useEffect, useState} from "react";

/**
 * Custom Hooks for updating the IST & EST time
 */
const useTime = (sessionTime,timeZone) => {

    const [istDate, setIstDate] = useState();
    const [istTime, setIstTime] = useState();
    const [estTime, setEstTime] = useState();
    const [estDate, setEstDate] = useState();

    useEffect(() => {
        let time = timeZone === "IST" ?  new Date().toTimeString().split(" ")[0] : new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}).split(" ")[1]; 
        time = time.split(":");
        const istTime = time[0]+":"+time[1];
        const estTime = time[0]+":"+time[1];
        let date = timeZone === "IST" ? new Date().toDateString().split(" ") : new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}).split(" ")[0];
        timeZone !== "IST" && (date = new Date(date).toDateString().split(" "));
        const year = date[3];
        const istDate = date[2]+ " "+ date[1].toUpperCase()+ " " + year[2]+year[3] + " - IST";
        const estDate = date[2]+ " "+ date[1].toUpperCase()+ " " + year[2]+year[3] + " - EST";
        timeZone === "IST" ? setIstDate(istDate) :  setEstDate(estDate);
        timeZone === "IST" ? setIstTime(istTime) : setEstTime(estTime);
    }, [sessionTime])


    if(timeZone === "IST") {
        return [istDate,istTime];
    } else {
        return [estDate,estTime];
    }

}

export default useTime;