import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'client/redux/store';
import { Movie } from 'core/modules/movies';

const getState = (state: RootState) => state.movies;

const getMovieDTOs = (state: RootState) => state.movies.movies;

const getMovies = createSelector(getMovieDTOs, (moviesDTOs) =>
    moviesDTOs.map((movieDTO) => new Movie(movieDTO)),
);

const getTotalPages = (state: RootState) => getState(state).totalPages;
const getPage = (state: RootState) => getState(state).page;
const getResultOriginCount = (state: RootState) =>
    getState(state).resultOriginCount;

const getIsSearchInProgress = (state: RootState) =>
    getState(state).isSearchInProgress;

const selectors = {
    getMovies,
    getTotalPages,
    getPage,
    getResultOriginCount,
    getIsSearchInProgress,
};

export default selectors;
