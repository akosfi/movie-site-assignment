import {
    FC,
    KeyboardEventHandler,
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './components/pagination/Pagination';
import { Button, ButtonSize } from 'client/modules/input/button';
import { TextInput, TextInputSize } from 'client/modules/input/textInput';
import { AppDispatch } from 'client/redux/store';
import findMoviesThunk from '../../redux/thunks/findMoviesThunk';
import { MovieSearchRequest } from 'core/modules/movies';
import selectors from '../../redux/selectors';
import css from './ListingPage.module.scss';
import MovieList from './components/movie-list/MovieList';
import Favourites from './components/favourites/Favourites';

const ListingPage: FC = () => {
    const [movieName, setMovieName] = useState('Annabelle');
    const dispatch = useDispatch<AppDispatch>();

    const findMovies = useCallback(
        (name: string, page: number) =>
            dispatch(
                findMoviesThunk({
                    movieSearchRequest: new MovieSearchRequest(name, page),
                }),
            ),
        [dispatch],
    );

    const isSearchInProgress = useSelector(selectors.getIsSearchInProgress);
    const movies = useSelector(selectors.getMovies);
    const resultOriginCount = useSelector(selectors.getResultOriginCount);

    const handleMovieNameChange = (name: string) => {
        setMovieName(name);

        if (name.length >= 3) {
            findMovies(name, 1);
        }
    };

    const handleKeyPressedOnInput = (
        ...args: Parameters<KeyboardEventHandler<HTMLInputElement>>
    ) => {
        if (args[0].key === 'Enter') {
            findMovies(movieName, 1);
        }
    };

    const listFragment = useMemo(() => {
        if (isSearchInProgress) {
            return (
                <div className={css['spinner-area']}>
                    <span className={css['spinner']} />
                </div>
            );
        }

        if (!movies.length) {
            return null;
        }

        return (
            <>
                <MovieList movies={movies} title="Search results" />

                <Pagination
                    onPageChangeRequested={(newPage) =>
                        findMovies(movieName, newPage)
                    }
                />
            </>
        );
    }, [isSearchInProgress, findMovies, movieName, movies]);

    return (
        <div className={css['layout']}>
            <h1 className={css['siteName']}>The Movie Site</h1>

            <Favourites />

            <div className={css['movieSearch']}>
                <TextInput
                    size={TextInputSize.SMALL}
                    value={movieName}
                    setValue={handleMovieNameChange}
                    placeHolder="Enter movie name"
                    onKeyDown={handleKeyPressedOnInput}
                />
                <Button
                    onClick={() => findMovies(movieName, 1)}
                    size={ButtonSize.SMALL}
                    label={'Search'}
                />
            </div>

            <p className={css['fetchResult']}>
                Results (API/Cache):{' '}
                {`${resultOriginCount.api} / ${resultOriginCount.cache}`}
            </p>

            {listFragment}
        </div>
    );
};

export default memo(ListingPage);
