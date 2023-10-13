import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'client/redux/store';
import { Movie } from 'core/modules/movies';

const getState = (state: RootState) => state.movieListingPage;

const getMovieDTOs = (state: RootState) => getState(state).movies;

const getMovies = createSelector(getMovieDTOs, (moviesDTOs) =>
    moviesDTOs.map((movieDTO) => new Movie(movieDTO)),
);

const getTotalPages = (state: RootState) => getState(state).totalPages;
const getPage = (state: RootState) => getState(state).page;
const getResultOriginCount = (state: RootState) =>
    getState(state).resultOriginCount;

const getIsSearchInProgress = (state: RootState) =>
    getState(state).isSearchInProgress;

const getFavouriteMovieDTOs = (state: RootState) => getState(state).favourites;

const getError = (state: RootState) => getState(state).error;

const getFavouriteMovies = createSelector(
    getFavouriteMovieDTOs,
    (favouriteMovieDTOs) =>
        favouriteMovieDTOs.map(
            (favouriteMovieDTO) => new Movie(favouriteMovieDTO),
        ),
);

const createGetIsAddedToFavourites = (movie: Movie) => (state: RootState) =>
    !!getFavouriteMovies(state).find(({ id }) => id === movie.id);

const selectors = {
    getMovies,
    getTotalPages,
    getPage,
    getResultOriginCount,
    getIsSearchInProgress,
    getFavouriteMovies,
    createGetIsAddedToFavourites,
    getError,
};

export default selectors;
