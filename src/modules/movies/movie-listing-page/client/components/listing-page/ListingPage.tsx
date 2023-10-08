import { FC, KeyboardEventHandler, memo, useMemo, useState } from 'react';

import ListingItem from './components/listing-item/ListingItem';

import css from './ListingPage.module.scss';
import { useMoviesContext } from 'modules/movies/client';
import { Button, ButtonSize } from 'modules/input/button';
import { TextInput, TextInputSize } from 'modules/input/textInput';
import Pagination from './components/pagination/Pagination';

const ListingPage: FC = () => {
    const [movieName, setMovieName] = useState('Annabelle');

    const { fetchMovies, resultOriginCount, isSearchInProgress, movies } =
        useMoviesContext();

    const handleMovieNameChange = (name: string) => {
        setMovieName(name);

        if (name.length >= 3) {
            fetchMovies(name, 1);
        }
    };

    const handleKeyPressedOnInput = (
        ...args: Parameters<KeyboardEventHandler<HTMLInputElement>>
    ) => {
        if (args[0].key === 'Enter') {
            fetchMovies(movieName, 1);
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
                        fetchMovies(movieName, newPage)
                    }
                />
            </>
        );
    }, [isSearchInProgress, fetchMovies, movieName, movies]);

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
                    onClick={() => fetchMovies(movieName, 1)}
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
