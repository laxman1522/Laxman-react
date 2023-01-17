import styles from "./lottery.module.scss";
import React, { useCallback, useRef, useState } from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import CustomInput from "../Input/customInput";
import Button from "../Buttons/button";

const Lottery = () => {

    console.log("lottery container");

    const inputRef: any = useRef();
    const mobileNumRef = useRef();

    const [disableButton, setDisableButton] = useState(true);
    const [lotteryPrize, setLotteryPrize] = useState(false);

    const lotteryCheckHandler = useCallback((event: any) => {
            mobileNumRef.current = inputRef.current.enteredValue();
            inputRef.current.enteredValue().length === 10 ? setDisableButton(false) : setDisableButton(true);
    },[]);

    const buttonClicked = useCallback(() => {
        mobileNumRef.current && ((mobileNumRef.current)%2 === 0 ? setLotteryPrize(true) : throwError());
    },[])

    const throwError = () => {
        throw new Error(APPCONSTANTS.ERROR_OCCURED);  
    }

    return (
        <React.Fragment>
            <div className={styles.lotteryContainer}>
                {!lotteryPrize && 
                <React.Fragment>
                    <div className={styles.description}>
                        {APPCONSTANTS.MOBILE_NUMBER_PRIZE}
                    </div>
                    <CustomInput className={styles.input} ref={inputRef} 
                    type="text" placeholder={APPCONSTANTS.MOBILE_NUMBER_PLACEHOLDER} 
                    onKeyUp={lotteryCheckHandler} onKeyDown={lotteryCheckHandler} maxLength={APPCONSTANTS.MOBILE_MAX_LENGTH} ></CustomInput>
                    <Button className={styles.btn} buttonName={APPCONSTANTS.FEELING_LUCKY} disabled={disableButton} buttonClickHandler={buttonClicked}></Button>
                </React.Fragment> }
                {lotteryPrize && 
                <div className={styles.lottoryWon}>{APPCONSTANTS.LOTTORY_WON}</div>}
            </div>  
            </React.Fragment>     
    )
}

export default Lottery;