import styles from "./allMovies.module.scss";
import React, {memo, useContext, useState} from "react";
import Movielist from "../../components/MovieList/movieList";
import MovieDetails from "../../components/MovieDetails/movieDetails";
import { loadingContext, movieDetailsContext } from "../../App";
import Loader from "../../components/Loader/loader";


const AllMovies: React.FC = () => {

    const [updatedMovie, setUpdatedMovie] = useState({});
    const {loading, setLoading} = useContext(loadingContext);


    const updateLikesHandler = (movieDetails : any) => {
        setUpdatedMovie({id:movieDetails.id,likes: movieDetails.likes });
    }

    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                {loading && <Loader></Loader>}
                <div className={styles.movieContainer}>
                    <Movielist updatedMovie={updatedMovie} updateLikes = {updateLikesHandler}></Movielist>
                </div>
                <div className={styles.movieDetails}>
                    <MovieDetails updatedMovie={updatedMovie} updateLikes = {updateLikesHandler}></MovieDetails>
                </div>
            </div>
        </div>
    )
}

export default memo(AllMovies);