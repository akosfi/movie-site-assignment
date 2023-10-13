import { Movie } from 'core/modules/movies';
import { FC } from 'react';
import ListingItem from './components/listing-item/ListingItem';

import css from './MovieList.module.scss';

type MovieListProps = {
    title: string;
    movies: Movie[];
    testId?: string;
};

const MovieList: FC<MovieListProps> = ({ movies, title, testId }) => (
    <>
        <p className={css['title']}>{title}</p>
        <div className={css['movies']} data-testid={testId}>
            {movies.map((movie) => (
                <ListingItem
                    movie={movie}
                    key={movie.id}
                    testId={testId + '/item'}
                />
            ))}
        </div>
    </>
);

export default MovieList;
