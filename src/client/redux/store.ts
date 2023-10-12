import { configureStore } from '@reduxjs/toolkit';
import { movieListingPageReducer } from 'client/modules/movies/movie-listing-page';

export const store = configureStore({
    reducer: {
        movieListingPage: movieListingPageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
