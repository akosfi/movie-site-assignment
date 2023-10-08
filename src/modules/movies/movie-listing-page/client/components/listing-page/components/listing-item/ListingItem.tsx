import { FC } from 'react';
import { Movie } from 'modules/movies/client';
import css from './ListingItem.module.scss';
import { Card } from './components/card';
import { Ellipse } from './components/ellipse';

type ListingItemProps = {
    movie: Movie;
};

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const ListingItem: FC<ListingItemProps> = ({ movie }) => (
    <Card className={css['card']}>
        <div className={css['image']}>
            <img src={`${imageBaseUrl}/${movie.posterPath}`} alt="item image" />
        </div>

        <p className={css['name']}>
            <Ellipse label={movie.title} length={20} />
        </p>
        <p className={css['releaseDate']}>{movie.releaseDate}</p>
        <p className={css['overview']}>
            <Ellipse label={movie.overview} length={100} />
        </p>
    </Card>
);

export default ListingItem;
