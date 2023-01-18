import React, {memo, useEffect, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import { teaser } from "../../modal/commonModel";
import { TeaserService } from "../../services/TeaserService";
import TeaserCard from "../TeaserCard/teaserCard";
import styles from './teasers.module.scss';

const Teasers = () => {

    const [teasers, setTeasers] = useState([]);

    useEffect(() => {
        const getTeasers = async () => {
            const teasers = await TeaserService.getShortTeasers();
            setTeasers(teasers);
        }    
        getTeasers();
    }, [])

    const teaserList = teasers.map((teaser : teaser) => {
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