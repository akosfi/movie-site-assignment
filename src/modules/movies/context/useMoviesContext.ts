import { useContext, useMemo } from 'react';
import moviesContext from './MoviesContext';

const useMoviesContext = () => {
    const context = useContext(moviesContext);
    return context;
};

export default useMoviesContext;
