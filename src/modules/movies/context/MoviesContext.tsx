import { createContext } from 'react';
import Movie from '../domain/Movie';

const moviesContext = createContext<{
    movies: Movie[];
    fetchMovies: (name: string, page: number) => void;
    page: number;
    totalPages: number;
}>({
    movies: [],
    fetchMovies: () => null,
    page: 0,
    totalPages: 0
});

export default moviesContext;
