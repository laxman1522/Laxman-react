import React, {memo, useEffect, useState} from "react";
import { APPCONSTANTS } from "../../constants/appConstants";
import { teaser } from "../../modal/commonModel";
import { TeaserService } from "../../services/TeaserService";
import TeaserCard from "../TeaserCard/teaserCard";
import styles from './teasers.module.scss';

const posters = ["https://mouseinfo.com/wp-content/uploads/2021/11/ENCANTO_Payoff_Courtyard_1s_v8.0_Mech6_FS-horiz-1280x640.jpg?crop=1",
                "https://highlightsalongtheway.com/wp-content/uploads/2019/02/DR3_StandeeWebArt_RGB_1-scaled.jpg",
            "https://i.etsystatic.com/25432943/r/il/5e571f/4167479894/il_fullxfull.4167479894_dgym.jpg"]

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
    const teaserList = teasers.map((teaser: teaser, index) => {
        return <TeaserCard key={teaser?.title} className={styles.teaserName} teaser={teaser} poster={posters[index]}></TeaserCard>
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