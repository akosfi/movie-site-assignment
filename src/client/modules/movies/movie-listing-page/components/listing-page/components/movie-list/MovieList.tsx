import { Movie } from 'core/modules/movies';
import { FC } from 'react';
import ListingItem from './components/listing-item/ListingItem';

import css from './MovieList.module.scss';

type MovieListProps = {
    title: string;
    movies: Movie[];
};

const MovieList: FC<MovieListProps> = ({ movies, title }) => (
    <>
        <p className={css['title']}>{title}</p>
        <div className={css['movies']}>
            {movies.map((movie) => (
                <ListingItem movie={movie} key={movie.id} />
            ))}
        </div>
    </>
);

export default MovieList;
