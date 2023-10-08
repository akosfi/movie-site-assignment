import { FC, ReactElement, useCallback, useState } from 'react';
import moviesContext, { MoviesContext } from './MoviesContext';
import RemoteMovieRepository from '../../../client/remote/RemoteMovieRepository';
import { FindMovieByNameUseCase } from 'modules/movies/movie-listing-page';

type MovieProviderProps = {
    children: ReactElement | ReactElement[];
};

const MoviesProvider: FC<MovieProviderProps> = ({ children }) => {
    const [moviesContextState, setMoviesContextState] = useState<
        Omit<MoviesContext, 'fetchMovies'>
    >({
        movies: [],
        totalPages: 0,
        page: 0,
        resultOriginCount: { api: 0, cache: 0 },
        isSearchInProgress: false,
    });

    const fetchMovies = useCallback(
        async (name: string, requestedPage: number) => {
            if (moviesContextState.isSearchInProgress) {
                return;
            }

            setMoviesContextState({
                ...moviesContextState,
                isSearchInProgress: true,
            });
            const {
                movieSearchResult: { movies, totalPages, page },
            } = await new FindMovieByNameUseCase({
                movieRepository: new RemoteMovieRepository(),
                name,
                page: requestedPage,
            }).execute();

            setMoviesContextState({
                movies,
                totalPages,
                page,
                resultOriginCount: {
                    api: moviesContextState.resultOriginCount.api + 1,
                    cache: 0,
                },
                isSearchInProgress: false,
            });
        },
        [moviesContextState],
    );

    return (
        <moviesContext.Provider value={{ ...moviesContextState, fetchMovies }}>
            {children}
        </moviesContext.Provider>
    );
};

export default MoviesProvider;
