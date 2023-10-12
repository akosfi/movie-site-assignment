import { FC, useEffect } from 'react';
import MovieList from '../movie-list/MovieList';
import selectors from 'client/modules/movies/movie-listing-page/redux/selectors';
import { actions } from 'client/modules/movies/movie-listing-page/redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'client/redux/store';

const Favourites: FC = () => {
    const favourites = useSelector(selectors.getFavouriteMovies);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const favouritesJSON = window.localStorage.getItem('favourites');
        const favouritesFromLocalStorage = favouritesJSON
            ? JSON.parse(favouritesJSON)
            : null;

        if (!!favouritesJSON && !!favouritesFromLocalStorage) {
            dispatch(
                actions.setFavourites({ movies: favouritesFromLocalStorage }),
            );
        }
    }, [dispatch]);

    if (!favourites.length) {
        return null;
    }

    return <MovieList movies={favourites} title="Favourites" />;
};

export default Favourites;
