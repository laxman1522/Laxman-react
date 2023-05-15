import styles from "./allMovies.module.scss";
import React, {memo, useContext, useEffect, useState} from "react";
import Movielist from "../../components/MovieList/movieList";
import MovieDetails from "../../components/MovieDetails/movieDetails";
import { loadingContext, movieDetailsContext } from "../../App";
import Loader from "../../components/Loader/loader";
import { updateMovieDetails } from "../../components/utils/updateMovieDetails";
import { MovieService } from "../../services/moviesService";


const AllMovies: React.FC = () => {

    const [updatedMovie] = useState({});
    const {loading, setLoading} = useContext(loadingContext);

    const [moviesList, setMoviesList] = useState<any>([]);
    const {currentMovie, setCurrentMovie} = useContext(movieDetailsContext);

    //INFO: use effect for fetching the movies 
    useEffect(() => {
       if(moviesList.length === 0) {
            setLoading(true);
            const getMovies = async () => {
                const movieList = await MovieService.getMovies();
                setMoviesList(movieList);
                setCurrentMovie(movieList[0]);
                setLoading(false);
            }
            getMovies();
       } 
       else {
            const updatedMoviesList: any = updateMovieDetails(moviesList,currentMovie);
            updatedMoviesList.length !==0 && setMoviesList(updatedMoviesList);
       }  
    }, [currentMovie])


    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                {loading && <Loader></Loader>}
                <div className={styles.movieContainer}>
                    <Movielist moviesList={moviesList} ></Movielist>
                </div>
                <div className={styles.movieDetails}>
                    <MovieDetails updatedMovie={updatedMovie}></MovieDetails>
                </div>
            </div>
        </div>
    )
}

export default memo(AllMovies);