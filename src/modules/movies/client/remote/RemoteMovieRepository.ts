import axios, { AxiosResponse } from 'axios';
import MovieRepository from '../../domain/MovieRepository';
import Movie, { MovieDTO } from '../../domain/Movie';
import MovieSearchResult, {
    MovieSearchResultOrigin,
} from '../../domain/MovieSearchResult';

export default class RemoteMovieRepository implements MovieRepository {
    findByName = async (name: string, requestedPage: number) => {
        const {
            data: { movies, page, totalPages, origin },
        }: AxiosResponse<{
            movies: MovieDTO[];
            page: number;
            totalPages: number;
            origin: MovieSearchResultOrigin;
        }> = await axios.get(`/api/movies?name=${name}&page=${requestedPage}`);
        return new MovieSearchResult(
            movies.map((movieDTO) => new Movie(movieDTO)),
            page,
            totalPages,
            origin,
        );
    };
}
