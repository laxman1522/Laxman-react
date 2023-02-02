import styles from './movieList.module.scss';
import React, {memo, useCallback, useContext, useEffect, useRef, useState} from 'react';
import { APPCONSTANTS } from '../../constants/appConstants';
import MovieCard from '../MovieCard/movieCard';
import { MovieService } from '../../services/moviesService';
import Button from '../Buttons/button';
import { loadingContext, movieDetailsContext } from '../../App';
import { movieList } from '../../modal/commonModel';

const initialCount = 6;

const MovieList : React.FC<movieList>= (props: movieList) => {

    const [moviesList, setMoviesList] = useState([{id: '',likes: ''}]);
    const [count, setCount] = useState(initialCount);
    const {currentMovie, setCurrentMovie} = useContext(movieDetailsContext);
    const {loading, setLoading} = useContext(loadingContext);

    const {updatedMovie} = props;

    useEffect(() => {
        setLoading(true);
        const getMovies = async () => {
            const movieList = await MovieService.getMovies();
            setMoviesList(movieList);
            setCurrentMovie(movieList[0]);
            setLoading(false);
        }

        getMovies();
    }, [])

    useEffect(() => {
        const updatedMoviesList = moviesList
        for(let movie of updatedMoviesList) {
           movie.id === updatedMovie.id && (movie.likes = updatedMovie.likes)
        }
        setMoviesList(updatedMoviesList);
    },[props])

    const updateMovieHandler = useCallback((movie: any) => {
        setCurrentMovie(movie);
    }, [])

    const movies = moviesList.map((movie : any, index) => {
       if(index < count) {
        return <MovieCard updateMovie = {updateMovieHandler} movieDetails={movie} likes={movie.likes}
                key={index}></MovieCard>
       }
    })

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