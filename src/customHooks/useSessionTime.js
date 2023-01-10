import React, {useEffect, useState} from "react";


/**
 * Custom Hooks for updating the session time
 */
const useSessionTime = () => {

    const [sessionTime, setSessionTime] = useState(0);

        useEffect(() => {
            let count = 1;
            let sessionTime = 0;
            setInterval(() => {
                count++;
                if(count === 60) {
                    count = 0;
                    ++sessionTime;
                    setSessionTime(sessionTime);
                }
            },1000)
        }, [])

        return[sessionTime];
}

export default useSessionTime;