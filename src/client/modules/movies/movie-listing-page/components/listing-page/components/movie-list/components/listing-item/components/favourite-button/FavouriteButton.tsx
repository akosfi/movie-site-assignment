import selectors from 'client/modules/movies/movie-listing-page/redux/selectors';
import { actions } from 'client/modules/movies/movie-listing-page/redux/slice';
import { AppDispatch } from 'client/redux/store';
import { Movie } from 'core/modules/movies';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './FavouriteButton.module.scss';

type FavouriteButtonProps = {
    movie: Movie;
    testId?: string;
};

const FavouriteButton: FC<FavouriteButtonProps> = ({ movie, testId }) => {
    const favourites = useSelector(selectors.getFavouriteMovies);
    const isAddedToFavourites = useSelector(
        selectors.createGetIsAddedToFavourites(movie),
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleFavouriteButtonClicked = () => {
        let newFavourites = [];
        if (!isAddedToFavourites) {
            newFavourites = [...favourites, movie];
        } else {
            newFavourites = favourites.filter(({ id }) => id !== movie.id);
        }

        const newFavouritesSerialized = newFavourites.map(({ serialize }) =>
            serialize(),
        );

        dispatch(actions.setFavourites({ movies: newFavouritesSerialized }));
        window.localStorage.setItem(
            'favourites',
            JSON.stringify(newFavouritesSerialized),
        );
    };

    return (
        <div
            className={css['favourite-button']}
            onClick={handleFavouriteButtonClicked}
            data-testid={testId}
        >
            {isAddedToFavourites ? (
                <img src="/assets/star_filled.svg" />
            ) : (
                <img src="/assets/star_empty.svg" />
            )}
        </div>
    );
};

export default FavouriteButton;
