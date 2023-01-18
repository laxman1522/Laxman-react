import React, {memo} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import styles from './language.module.scss';

const Language = () => {


    const languageList = APPCONSTANTS.LANGUAGES.map((language) => {
            return (
                <div key={language} className={styles.language}>
                    <span>{language}</span>
                </div>
            )
    })

    return (
        <React.Fragment>
            <div className = {styles.languageContainer}>
                <div className={styles.viewOtherLanguages}>{APPCONSTANTS.OTHER_LANGUAGES}</div>
                <div className="d-flex">
                    {languageList}
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(Language);