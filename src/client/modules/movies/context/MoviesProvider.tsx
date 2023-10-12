import { FC, ReactElement, useCallback, useState } from 'react';
import moviesContext, { MoviesContext } from './MoviesContext';
import RemoteMovieRepository from '../remote/RemoteMovieRepository';
import {
    FindMovieUseCase,
    MovieSearchRequest,
    ResultOrigin,
} from 'core/modules/movies';

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
                movieSearchResult: { movies, totalPages, page, origin },
            } = await new FindMovieUseCase({
                movieRepository: new RemoteMovieRepository(),
                movieSearchRequest: new MovieSearchRequest(name, requestedPage),
            }).execute();

            setMoviesContextState({
                movies,
                totalPages,
                page,
                resultOriginCount:
                    origin === ResultOrigin.CACHED
                        ? {
                              api: moviesContextState.resultOriginCount.api,
                              cache:
                                  moviesContextState.resultOriginCount.cache +
                                  1,
                          }
                        : {
                              api: moviesContextState.resultOriginCount.api + 1,
                              cache: moviesContextState.resultOriginCount.cache,
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
