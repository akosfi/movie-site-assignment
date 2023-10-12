import axios, { AxiosResponse } from 'axios';
import {
    MovieRepository,
    MovieDTO,
    MovieSearchResult,
    Movie,
} from 'core/movies';
import { MovieSearchRequest } from 'core/movies';

export default class RemoteMovieRepository implements MovieRepository {
    find = async (movieSearchRequest: MovieSearchRequest) => {
        const {
            data: { movies, page, totalPages },
        }: AxiosResponse<{
            movies: MovieDTO[];
            page: number;
            totalPages: number;
        }> = await axios.get(
            `/api/movies?name=${movieSearchRequest.name}&page=${movieSearchRequest.page}`,
        );
        return new MovieSearchResult(
            movies.map((movieDTO) => new Movie(movieDTO)),
            page,
            totalPages,
        );
    };
}
