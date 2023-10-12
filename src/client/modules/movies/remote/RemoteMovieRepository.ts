import axios, { AxiosResponse } from 'axios';
import {
    MovieRepository,
    MovieSearchRequest,
    MovieDTO,
    MovieSearchResult,
    Movie,
    ResultOrigin,
} from 'core/modules/movies';

export default class RemoteMovieRepository implements MovieRepository {
    find = async (movieSearchRequest: MovieSearchRequest) => {
        const {
            data: { movies, page, totalPages, origin },
        }: AxiosResponse<{
            movies: MovieDTO[];
            page: number;
            totalPages: number;
            origin: ResultOrigin;
        }> = await axios.get(
            `/api/movies?name=${movieSearchRequest.name}&page=${movieSearchRequest.page}`,
        );
        return new MovieSearchResult(
            movies.map((movieDTO) => new Movie(movieDTO)),
            page,
            totalPages,
            origin,
        );
    };
}
