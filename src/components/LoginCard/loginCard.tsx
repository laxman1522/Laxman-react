import styles from './loginCard.module.scss';
import React, {memo, useRef} from 'react';
import { APPCONSTANTS } from '../../constants/appConstants';
import Button from '../Buttons/button';
import CustomInput from '../Input/customInput';
import { LoginService } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/routeConstants';

/**
 * 
 * @description For showing the login card including  email, password & submit button
 */
const LoginCard : React.FC = () => {

    const {LOGIN, LOGIN_INFO, EMAIL, PASSWORD} = APPCONSTANTS;
    const emailRef : any = useRef();
    const passwordRef: any = useRef();
    const navigate = useNavigate();

    //INFO: to aunthenticate the user
    const authenticateUser = () => {
        const email = emailRef?.current?.enteredValue();
        const password = passwordRef?.current?.enteredValue();
        const validUser = LoginService.authenticateUser(email,password);
        if(validUser) {
            const userDetails ={
                username: email,
                login: true
            }
            localStorage.setItem("user",JSON.stringify(userDetails));
            navigate(ROUTE_CONSTANTS.HOME);
        }
    }

    return (
        <div className={styles.loginCard}>
            <div className={styles.loginContainer}>
                <div className={styles.login}>{LOGIN}</div>
                <div className={styles.loginInfo}>{LOGIN_INFO}</div>
                <div className={styles.email}>
                    <label htmlFor='email'>{EMAIL}</label>
                    <CustomInput ref={emailRef} type="text" name="email"></CustomInput>
                </div>
                <div className={styles.password}>
                    <label htmlFor='password'>{PASSWORD}</label>
                    <CustomInput ref={passwordRef} type="text" name="password"></CustomInput>
                </div>
                <Button className={styles.btn} buttonName={LOGIN.toUpperCase()} buttonClickHandler={authenticateUser}></Button>
            </div>
        </div>
    )
}

export default memo(LoginCard);