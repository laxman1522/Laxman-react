import styles from './movieCard.module.scss';
import React, {memo} from "react";
import { APPCONSTANTS } from '../../constants/appConstants';
import { movieCard } from '../../modal/commonModel';

/**
 * @description for showing every individual movie in a card format
 */
const MovieCard: React.FC<movieCard> = (props: movieCard) => {

    const {movie,link} = props?.movieDetails;
    const {likes, updateMovie} = props

    const updateMovieHandler =  () => {
        updateMovie(props.movieDetails);
    }

    return(
        <div className={styles.container} onClick={updateMovieHandler}>
            <div className={styles.movieCard}>
                <img src={link} alt={movie}></img>
                <div className={styles.movieName}>{movie}</div>
                <div className={styles.likesContainer}>
                    <div className={styles.likes}>{likes} {APPCONSTANTS.LIKES}</div>
                    <div className={styles.likeLogo}><i className="fa fa-thumbs-o-up"></i></div>
                </div>
            </div>
        </div>
    )
}



export default memo(MovieCard);