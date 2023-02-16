import React, {memo} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import styles from './language.module.scss';

/**
 * @description For showing the available languages in the home page
 */
const Language: React.FC = () => {

    //INFO: iterating through the available languages and retunrs the jsx for each language
    const languageList = APPCONSTANTS.LANGUAGES.map((language: string) => {
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