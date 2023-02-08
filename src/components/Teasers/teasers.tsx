import React, {memo, useEffect, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import { teaser } from "../../modal/commonModel";
import { TeaserService } from "../../services/TeaserService";
import TeaserCard from "../TeaserCard/teaserCard";
import styles from './teasers.module.scss';

/**
 * @description for showing all the availabel teasers
 */
const Teasers: React.FC = () => {

    const [teasers, setTeasers] = useState([]);

    //INFO: use effect for fetching all the available teasers
    useEffect(() => {
        const getTeasers = async () => {
            const teasers = await TeaserService.getShortTeasers();
            setTeasers(teasers);
        }    
        getTeasers();
    }, [])

    //INFO: For iterating through the available teasers and returns jsx for individual teasers
    const teaserList = teasers.map((teaser: teaser) => {
        return <TeaserCard key={teaser?.title} className={styles.teaserName} teaser={teaser}></TeaserCard>
    })

    return (
        <React.Fragment>
            <div className={styles.teaserTitle}>{APPCONSTANTS.SHORT_TEASERS}</div>
            <div className={`${styles.teaserContainer} d-flex`}>
                {teaserList}
            </div>
        </React.Fragment>
    )
}

export default memo(Teasers);