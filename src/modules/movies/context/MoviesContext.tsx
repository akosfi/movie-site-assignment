import { createContext } from 'react';
import Movie from '../domain/Movie';

export type MoviesContext = {
    movies: Movie[];
    fetchMovies: (name: string, page: number) => void;
    page: number;
    totalPages: number;
    resultOriginCount: {
        cache: number;
        api: number;
    }
}

const moviesContext = createContext<MoviesContext>({
    movies: [],
    fetchMovies: () => null,
    page: 0,
    totalPages: 0,
    resultOriginCount: {
        cache: 0,
        api: 0
    }
});

export default moviesContext;
