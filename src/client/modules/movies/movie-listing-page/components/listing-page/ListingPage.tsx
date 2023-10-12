import {
    FC,
    KeyboardEventHandler,
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react';

import ListingItem from './components/listing-item/ListingItem';
import Pagination from './components/pagination/Pagination';
import { Button, ButtonSize } from 'client/modules/input/button';
import { TextInput, TextInputSize } from 'client/modules/input/textInput';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'client/redux/store';

import css from './ListingPage.module.scss';
import findMoviesThunk from 'client/modules/movies/redux/thunks/findMoviesThunk';
import { MovieSearchRequest } from 'core/modules/movies';
import selectors from 'client/modules/movies/redux/selectors';

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

    const listFramgent = useMemo(() => {
        if (isSearchInProgress) {
            return (
                <div className={css['spinner-area']}>
                    <span className={css['spinner']} />
                </div>
            );
        }
        return (
            <>
                <div className={css['movies']}>
                    {movies.map((movie) => (
                        <ListingItem movie={movie} key={movie.id} />
                    ))}
                </div>

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

            {listFramgent}
        </div>
    );
};

export default memo(ListingPage);
