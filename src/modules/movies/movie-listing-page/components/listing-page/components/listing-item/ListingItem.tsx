import { FC } from 'react';
import { Card } from 'modules/data-display/card';
import { Movie } from 'modules/movies';
import css from './ListingItem.module.scss';
import { Ellipse } from 'modules/data-display/ellipse';

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
