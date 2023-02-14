import styles from "./lottery.module.scss";
import React, { useCallback, useRef, useState, memo, useContext } from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import CustomInput from "../Input/customInput";
import Button from "../Buttons/button";
import { errorContext } from "../../App";


/**
 * @description To show the lottery section field in the home page
 */
const Lottery: React.FC = () => {

    const {errorOccured, setErrorOccured} = useContext(errorContext);

    if(errorOccured === true) {
        throw new Error(APPCONSTANTS.ERROR_OCCURED); 
    }

    const inputRef: any = useRef();
    const mobileNumRef = useRef();

    const [disableButton, setDisableButton] = useState(true);
    const [lotteryPrize, setLotteryPrize] = useState(false);

    //INFO: for checking whether the entered phone number is valid or not
    const lotteryCheckHandler = useCallback((event: any) => {
            mobileNumRef.current = inputRef.current.enteredValue();
            const mobileNumberValidation = /^[0-9\b]+$/;
            (inputRef.current.enteredValue().length === 10 && mobileNumberValidation.test(event.target.value)) 
            ? setDisableButton(false) : setDisableButton(true);
    },[]);

    //INFO: for checking whether the entered phone number won any lottery
    const buttonClicked = useCallback(() => {
        inputRef.current.clearInput();
        mobileNumRef.current && ((mobileNumRef.current)%2 === 0 ? setLotteryPrize(true) : setErrorOccured(true));
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

Lottery.defaultProps = {
    error: false,
    errorOccured: () => {}
}

export default memo(Lottery);