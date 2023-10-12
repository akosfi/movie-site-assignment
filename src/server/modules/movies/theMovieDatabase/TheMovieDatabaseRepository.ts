import axios, { AxiosResponse } from 'axios';
import {
    MovieRepository,
    MovieSearchRequest,
    MovieSearchResult,
    ResultOrigin,
} from 'core/modules/movies';

type APIMovieDTO = {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
};

export default class TheMovieDatabaseRepository implements MovieRepository {
    find = async (movieSearchRequest: MovieSearchRequest) => {
        const {
            data: { page, results, total_pages },
        }: AxiosResponse<{
            page: number;
            results: APIMovieDTO[];
            total_pages: number;
        }> = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${movieSearchRequest.name}&include_adult=false&language=en-US&page=${movieSearchRequest.page}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.MOVIE_DB_ACCESS_TOKEN}`,
                    Accept: 'application/json',
                },
            },
        );

        return new MovieSearchResult(
            results.map((apiMovie) => ({
                ...apiMovie,
                releaseDate: apiMovie.release_date,
                posterPath: apiMovie.poster_path,
            })),
            page,
            total_pages,
            ResultOrigin.EXTERNAL,
        );
    };
}
