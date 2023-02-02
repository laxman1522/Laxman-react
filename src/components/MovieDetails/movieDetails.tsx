import styles from './movieDetails.module.scss';
import React,{ useContext, useEffect, useState} from 'react';
import { loadingContext, movieDetailsContext } from '../../App';
import { APPCONSTANTS } from '../../constants/appConstants';
import WithAdvertisement from '../HigherOrderComponent/withAdvertisement';
import adImage from "../../assets/adv-2.png";
import { movieDetails } from '../../modal/commonModel';

const adDetails = {
    message: APPCONSTANTS.ADVERTISEMENT,
    timer: 15
}

const resumeDetails = {
    message: APPCONSTANTS.RESUMES,
    timer: 5
}

const MovieDetails: React.FC<movieDetails> = (props: movieDetails) => {

    const {currentMovie, setCurrentMovie} = useContext(movieDetailsContext);
    const {loading, setLoading} = useContext(loadingContext);
    const [movieDetails, setMovieDetails] = useState(currentMovie);
    const [likes, setLikes] = useState();

    const {timer,message, startedPlaying, showAd, showAdImage, showingAd, updateLikes} = props;

    if(message === APPCONSTANTS.ADVERTISEMENT && timer === 0) {
        showingAd(resumeDetails);
    } 

    useEffect(() => {
        setMovieDetails(currentMovie);
        setLikes(currentMovie.likes);
    }, [currentMovie])

    useEffect(() => {
        (movieDetails?.movie ) && startedPlaying(adDetails);
    }, [movieDetails]);

    const actorsList =  movieDetails?.actors?.map((actor: string) => {
        return <div key={actor} className={styles.actor}>{actor}</div>
    })

    const minuteConverter = (time : any) => {
        let minutes = Math.floor(time/ 60);
        let seconds: number | string = time- minutes * 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `0${minutes}:${seconds}`
    }

    const updateLikesHandler = () => {
        const updatedMovieDetails = currentMovie;
        let likes = parseInt(updatedMovieDetails.likes);
        likes = likes + 1;
        updatedMovieDetails.likes = likes;
        setCurrentMovie(updatedMovieDetails);
        setLikes(updatedMovieDetails.likes);
        updateLikes(updatedMovieDetails);
    }

    return(
        <React.Fragment>
        {!loading && 
        <div className={styles.movieDetailsContainer}>
            {showAdImage && <img className={styles.adImage} width="400" height="300" src={adImage} alt="adImage"></img>}
            {!showAdImage && 
            <React.Fragment>
                <div className={styles.movieName}>
                    <div className={styles.name}>{movieDetails?.movie}<span>{likes} {APPCONSTANTS.LIKES}</span></div>
                    <div className={styles.likes} onClick={updateLikesHandler}><i className="fa fa-thumbs-o-up"></i></div>
                </div>
                <img src={movieDetails?.link} alt={movieDetails?.movie}></img>
                <div className={styles.description}>{movieDetails?.description}</div>
                <div className={styles.actors}> 
                    <div className={styles.title}>{APPCONSTANTS.ACTORS.toUpperCase()}</div>
                    {actorsList}
                </div>
            </React.Fragment>}
            {showAd && <div className={styles.adMessage}>{message}{minuteConverter(timer)}</div>}
        </div> }
        </React.Fragment>
    )
}

MovieDetails.defaultProps = {
    timer : undefined,
    message: '',
    startedPlaying: () => {},
    showAd: false, 
    showAdImage: false, 
    showingAd:() => {},
    updateLikes: () => {}
}

export default  WithAdvertisement(MovieDetails);