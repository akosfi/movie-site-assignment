import { FC, ReactElement, useCallback, useState } from 'react';
import moviesContext from './MoviesContext';
import Movie from '../domain/Movie';
import FindMovieByNameUseCase from '../useCases/findMovieByNameUseCase';
import RemoteMovieRepository from '../remote/RemoteMovieRepository';

type MovieProviderProps = {
    children: ReactElement | ReactElement[];
};

const MoviesProvider: FC<MovieProviderProps> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    //TODO: use 1 setState. They change together


    const fetchMovies = useCallback(async (name: string, page: number) => {
        const { movies } = await new FindMovieByNameUseCase({ movieRepository: new RemoteMovieRepository(), name, page }).execute();
        setMovies(movies);
        setTotalPages(0);
        setPage(0)
    }, []);

    return (
        <moviesContext.Provider value={{ movies, fetchMovies, totalPages: 0, page: 0 }}>
            {children}
        </moviesContext.Provider>
    );
};

export default MoviesProvider;
