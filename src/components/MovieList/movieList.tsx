import styles from './movieList.module.scss';
import React, {memo, useCallback, useContext, useState} from 'react';
import { APPCONSTANTS } from '../../constants/appConstants';
import MovieCard from '../MovieCard/movieCard';
import Button from '../Buttons/button';
import { loadingContext, movieDetailsContext } from '../../App';

const initialCount = 6;

/**
 * @description for showing all the available movies in the card format
 */
const MovieList : React.FC<any>= (props: any) => {

    const {moviesList} = props;
    const [count, setCount] = useState(initialCount);
    const { setCurrentMovie} = useContext(movieDetailsContext);
    const {loading} = useContext(loadingContext);

    //INFO: to update the current selected movie globally
    const updateMovieHandler = useCallback((movie: any) => {
        setCurrentMovie(movie);
    }, [])

    const updateLikesHandler = useCallback((movie: any) => {
        const updatedMovieDetails = movie;
        let likes = parseInt(updatedMovieDetails.likes);
        likes = likes + 1;
        updatedMovieDetails.likes = likes;
    },[])

    //INFO: for iterating throught the movie list and returning jsx for individual moviess
    const movies = moviesList.map((movie : any, index: number) => {
       if(index < count) {
        return <MovieCard updateMovie = {updateMovieHandler} updateLikes={updateLikesHandler} movieDetails={movie} likes={movie.likes}
                key={index}></MovieCard>
       }
    })

    //INFO: for loading more movies on clikcing of load handler button
    const loadMoreHandler = useCallback(() => {
        setCount(moviesList.length);
    }, [moviesList])

    return (
        <React.Fragment>
            {!loading && 
            <div className={styles.movieList}>
                <div className={styles.allMovies}>{APPCONSTANTS.ALL_MOVIES}</div>
                <div className={styles.movieContainer}>
                    {movies}
                </div>
                {count === initialCount && <Button className={styles.btn} buttonName={APPCONSTANTS.LOAD_MORE} buttonClickHandler={loadMoreHandler}></Button>}
            </div>}
        </React.Fragment>
    )
}

export default memo(MovieList);