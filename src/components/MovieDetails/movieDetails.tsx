import styles from './movieDetails.module.scss';
import React,{ useContext, useEffect, useState} from 'react';
import { loadingContext, movieDetailsContext } from '../../App';
import { APPCONSTANTS } from '../../constants/appConstants';
import WithAdvertisement from '../HigherOrderComponent/withAdvertisement';
import adImage from "../../assets/adv-2.png";
import { movieDetails } from '../../modal/commonModel';
import HOC from '../HigherOrderComponent/hoc';

//INFO: ad details
const adDetails = {
    message: APPCONSTANTS.ADVERTISEMENT,
    timer: 15
}

//INFO: ad resume details
const resumeDetails = {
    message: APPCONSTANTS.RESUMES,
    timer: 5
}

/**
 * @description For showing the details of the selected moie along with description, actors and likes
 */
const MovieDetails: React.FC<movieDetails> = (props: movieDetails) => {

    const {timer,message, startedPlaying, showAd, showAdImage, showingAd, updateLikes, updatedMovie, teaserTime , stopAd} = props;

    const {currentMovie, setCurrentMovie} = useContext(movieDetailsContext);
    const [movie,setMovie] = useState<any>(currentMovie?.movie);
    const {loading, setLoading} = useContext(loadingContext);
    const [likes, setLikes] = useState(updatedMovie.likes);

    useEffect(() => {
        setLikes(updatedMovie.likes)
    },[updatedMovie])

    //INFO: use effect for updating the movie details 
    useEffect(() => {
        setLikes(currentMovie.likes);
    }, [currentMovie])

    //INFO: use effect for updating the ad details on selecting the movie
    useEffect(() => {
        let interval:any;
        currentMovie && setMovie(currentMovie?.movie);
        (currentMovie?.movie !==movie ) && startedPlaying(adDetails);
        if(message === adDetails.message && timer >= 0 ) {
            interval = setInterval(() => {
                teaserTime(adDetails.timer - (timer-1), adDetails);
            },1000)
        } else if(message === APPCONSTANTS.ADVERTISEMENT && timer < 0) {
            showingAd(resumeDetails);
        } 
        else if(message === resumeDetails.message && timer >=0 ) {
            interval = setInterval(() => {
                teaserTime(resumeDetails.timer - (timer-1), resumeDetails);
            },1000)
        } else if(message === resumeDetails.message && timer < 0) {
            stopAd();
        }

        return(() => {
            clearInterval(interval);
        })

    }, [currentMovie,timer]);

    //INFO: for iterating through the actors list
    const actorsList =  currentMovie?.actors?.map((actor: string) => {
        return <div key={actor} className={styles.actor}>{actor}</div>
    })

    //INFO: minute converter for converting the seconds to the minute:seconds format
    const minuteConverter = (time : any) => {
        let minutes = Math.floor(time/ 60);
        let seconds: number | string = time- minutes * 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `0${minutes}:${seconds}`
    }

    //INFO: for updating the likes globally on clicking the like icon
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
                    <div className={styles.name}>{currentMovie?.movie}<span>{likes} {APPCONSTANTS.LIKES}</span></div>
                    <div className={styles.likes} onClick={updateLikesHandler}><i className="fa fa-thumbs-o-up"></i></div>
                </div>
                <img src={currentMovie?.link} alt={currentMovie?.movie}></img>
                <div className={styles.description}>{currentMovie?.description}</div>
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

export default  HOC(MovieDetails);