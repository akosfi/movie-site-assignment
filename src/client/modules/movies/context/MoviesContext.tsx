import { Movie } from 'core/modules/movies';
import { createContext } from 'react';

export type MoviesContext = {
    movies: Movie[];
    fetchMovies: (name: string, page: number) => void;
    page: number;
    totalPages: number;
    resultOriginCount: {
        cache: number;
        api: number;
    };
    isSearchInProgress: boolean;
};

const moviesContext = createContext<MoviesContext>({
    movies: [],
    fetchMovies: () => null,
    page: 0,
    totalPages: 0,
    resultOriginCount: {
        cache: 0,
        api: 0,
    },
    isSearchInProgress: false,
});

export default moviesContext;
