import axios, { AxiosResponse } from 'axios';
import MovieRepository from '../../../domain/MovieRepository';

type APIMovieDTO = {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
};

export default class TheMovieDatabaseRepository implements MovieRepository {
    findByName = async (name: string, requestedPage: number) => {
        const {
            data: { page, results, total_pages },
        }: AxiosResponse<{
            page: number;
            results: APIMovieDTO[];
            total_pages: number;
        }> = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${requestedPage}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.MOVIE_DB_ACCESS_TOKEN}`,
                    Accept: 'application/json',
                },
            },
        );

        return {
            movies: results.map((apiMovie) => ({
                ...apiMovie,
                releaseDate: apiMovie.release_date,
                posterPath: apiMovie.poster_path,
            })),
            page,
            totalPages: total_pages,
        };
    };
}
