export const updateMovieDetails = (moviesList: any, currentMovie: any) => {
    if(currentMovie.length !== 0 ) {
        const updatedMoviesList = []
        for(let movie of moviesList) {
           if(movie?.id === currentMovie?.id) {
                updatedMoviesList.push({...movie, likes: currentMovie?.likes});
           } else {
            updatedMoviesList.push(movie);
           }
        }

        return updatedMoviesList;
    }
    
}