import React from "react";
import styles from './loader.module.scss';

/**
 * 
 * @description for showing loader while fetching the data or loading the page data
 */
const Loader: React.FC = () => {

    return (
        <div className={styles.spinner}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader;