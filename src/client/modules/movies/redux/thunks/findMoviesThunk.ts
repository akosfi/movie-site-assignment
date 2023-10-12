import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    FindMovieUseCase,
    MovieDTO,
    MovieSearchRequest,
    ResultOrigin,
} from 'core/modules/movies';
import RemoteMovieRepository from '../../remote/RemoteMovieRepository';

const findMoviesThunk = createAsyncThunk<
    {
        movies: MovieDTO[];
        totalPages: number;
        page: number;
        origin: ResultOrigin;
    },
    { movieSearchRequest: MovieSearchRequest },
    { rejectValue: string }
>('movies/findMoviesThunk', async ({ movieSearchRequest }, thunkAPI) => {
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
});

export default findMoviesThunk;
