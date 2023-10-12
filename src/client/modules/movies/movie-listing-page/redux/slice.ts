import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MovieDTO, ResultOrigin } from 'core/modules/movies';
import findMoviesThunk from './thunks/findMoviesThunk';

export interface MovieListingPageState {
    movies: MovieDTO[];
    page: number;
    totalPages: number;
    resultOriginCount: {
        cache: number;
        api: number;
    };
    isSearchInProgress: boolean;
    error?: string;
    favourites: MovieDTO[];
}

const initialState: MovieListingPageState = {
    movies: [],
    page: 0,
    totalPages: 0,
    resultOriginCount: {
        cache: 0,
        api: 0,
    },
    isSearchInProgress: false,
    error: undefined,
    favourites: [],
};

export const movieListingPageSlice = createSlice({
    name: 'movieListingPage',
    initialState,
    reducers: {
        setFavourites(
            state,
            { payload: { movies } }: PayloadAction<{ movies: MovieDTO[] }>,
        ) {
            state.favourites = movies;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(findMoviesThunk.pending, (state) => {
            state.isSearchInProgress = true;
        });
        builder.addCase(findMoviesThunk.fulfilled, (state, action) => {
            state.isSearchInProgress = false;
            state.movies = action.payload.movies;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
            state.resultOriginCount =
                action.payload.origin === ResultOrigin.CACHED
                    ? {
                          api: state.resultOriginCount.api,
                          cache: state.resultOriginCount.cache + 1,
                      }
                    : {
                          api: state.resultOriginCount.api + 1,
                          cache: state.resultOriginCount.cache,
                      };
        });
        builder.addCase(findMoviesThunk.rejected, (state, action) => {
            state.isSearchInProgress = false;
            state.error = action.payload;
        });
    },
});

export const { actions } = movieListingPageSlice;

export default movieListingPageSlice.reducer;
