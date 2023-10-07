import { useContext, useMemo } from 'react';
import moviesContext from './MoviesContext';

const useMoviesContext = () => {
    const { movies, fetchMovies } = useContext(moviesContext);


    return { movies, fetchMovies };
};

export default useMoviesContext;
