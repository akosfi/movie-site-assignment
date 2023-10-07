
import { FC, memo, useState } from 'react';

import ListingItem from './components/listing-item/ListingItem';

import css from './ListingPage.module.scss';
import { Movie, useMoviesContext } from 'modules/movies';
import { Button, ButtonSize } from 'modules/input/button';
import { TextInput, TextInputSize } from 'modules/input/textInput';
import Pagination from './components/pagination/Pagination';

const ListingPage: FC = () => {
    const [movieName, setMovieName] = useState("Annabelle");

    const { fetchMovies, resultOriginCount, totalPages, movies, page: currentPage } = useMoviesContext();

    return (
        <div className={css['layout']}>
            <h1 className={css['siteName']}>
                The Movie Site
            </h1>

            <div className={css['movieSearch']}>
                <TextInput size={TextInputSize.SMALL} value={movieName} setValue={setMovieName} placeHolder="Enter movie name" />
                <Button onClick={() => fetchMovies(movieName, 1)} size={ButtonSize.SMALL} label={'Search'} />
            </div>

            <p className={css['fetchResult']}>
                Results (API/Cache): {`${resultOriginCount.api} / ${resultOriginCount.cache}`}
            </p>

            <div className={css['movies']}>
                {movies.map((movie) => (
                    <ListingItem movie={movie} key={movie.id} />
                ))}
            </div>

            <Pagination onPageChangeRequested={(newPage) => fetchMovies(movieName, newPage)} />

        </div >
    )
};

export default memo(ListingPage);
