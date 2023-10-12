import { createAsyncThunk } from '@reduxjs/toolkit';
import RemoteMovieRepository from 'client/modules/movies/remote/RemoteMovieRepository';
import {
    MovieDTO,
    ResultOrigin,
    MovieSearchRequest,
    FindMovieUseCase,
} from 'core/modules/movies';

const findMoviesThunk = createAsyncThunk<
    {
        movies: MovieDTO[];
        totalPages: number;
        page: number;
        origin: ResultOrigin;
    },
    { movieSearchRequest: MovieSearchRequest },
    { rejectValue: string }
>(
    'movieListingPage/findMoviesThunk',
    async ({ movieSearchRequest }, thunkAPI) => {
        try {
            const {
                movieSearchResult: { movies, totalPages, page, origin },
            } = await new FindMovieUseCase({
                movieRepository: new RemoteMovieRepository(),
                movieSearchRequest: movieSearchRequest,
            }).execute();

            return {
                movies: movies.map(({ serialize }) => serialize()),
                totalPages,
                page,
                origin,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to load movies!');
        }
    },
);

export default findMoviesThunk;
