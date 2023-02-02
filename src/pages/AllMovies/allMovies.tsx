import styles from "./allMovies.module.scss";
import React, {memo, useContext, useState} from "react";
import Movielist from "../../components/MovieList/movieList";
import Header from "../../components/Header/header";
import MovieDetails from "../../components/MovieDetails/movieDetails";
import { loadingContext } from "../../App";
import Loader from "../../components/Loader/loader";



const AllMovies: React.FC = () => {

    const [updatedMovie, setUpdatedMovie] = useState({});
    const {loading, setLoading} = useContext(loadingContext);


    const updateLikesHandler = (movieDetails : any) => {
        setUpdatedMovie({id:movieDetails.id,likes: movieDetails.likes });
    }

    return(
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.mainContainer}>
                {loading && <Loader></Loader>}
                <div className={styles.movieContainer}>
                    <Movielist updatedMovie={updatedMovie}></Movielist>
                </div>
                <div className={styles.movieDetails}>
                    <MovieDetails updateLikes = {updateLikesHandler}></MovieDetails>
                </div>
            </div>
        </div>
    )
}

export default memo(AllMovies);