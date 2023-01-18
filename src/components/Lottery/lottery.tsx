import styles from "./lottery.module.scss";
import React, { useCallback, useRef, useState, memo } from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import CustomInput from "../Input/customInput";
import Button from "../Buttons/button";
import { lotteryProps } from "../../modal/commonModel";

const Lottery = (props: lotteryProps) => {

    console.log("lottery container");

    if(props.error === true) {
        throw new Error(APPCONSTANTS.ERROR_OCCURED); 
    }

    const inputRef: any = useRef();
    const mobileNumRef = useRef();

    const [disableButton, setDisableButton] = useState(true);
    const [lotteryPrize, setLotteryPrize] = useState(false);

    const lotteryCheckHandler = useCallback((event: any) => {
            mobileNumRef.current = inputRef.current.enteredValue();
            const mobileNumberValidation = /^[0-9\b]+$/;
            (inputRef.current.enteredValue().length === 10 && mobileNumberValidation.test(event.target.value)) 
            ? setDisableButton(false) : setDisableButton(true);
    },[]);

    const buttonClicked = useCallback(() => {
        inputRef.current.clearInput();
        mobileNumRef.current && ((mobileNumRef.current)%2 === 0 ? setLotteryPrize(true) : props.errorOccured(APPCONSTANTS.ERROR_OCCURED));
    },[])

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

export default memo(Lottery);