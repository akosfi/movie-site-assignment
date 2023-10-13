import { FC, useState } from 'react';
import css from './ListingItem.module.scss';
import { Card } from 'client/modules/data-display/card';
import { Ellipse } from 'client/modules/data-display/ellipse';
import { Movie } from 'core/modules/movies';
import FavouriteButton from './components/favourite-button/FavouriteButton';

type ListingItemProps = {
    movie: Movie;
    testId?: string;
};

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const ListingItem: FC<ListingItemProps> = ({ movie, testId }) => {
    const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const handleImageLoadError = () => setImageLoadFailed(true);

    return (
        <Card className={css['card']} testId={testId}>
            <FavouriteButton
                movie={movie}
                testId={testId + '/favouriteButton'}
            />
            <div className={css['image']}>
                {!imageLoadFailed ? (
                    <img
                        src={`${imageBaseUrl}/${movie.posterPath}`}
                        alt="item image"
                        onError={handleImageLoadError}
                    />
                ) : (
                    <span>Poster cannot be loaded.</span>
                )}
            </div>

            <p className={css['name']} data-testId={testId + '/name'}>
                <Ellipse label={movie.title} length={20} />
            </p>
            <p className={css['releaseDate']}>{movie.releaseDate}</p>
            <p className={css['overview']}>
                <Ellipse label={movie.overview} length={100} />
            </p>
        </Card>
    );
};

export default ListingItem;
