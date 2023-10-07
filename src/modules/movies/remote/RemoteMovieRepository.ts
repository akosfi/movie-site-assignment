import axios, { AxiosResponse } from 'axios';
import MovieRepository from '../domain/MovieRepository';
import Movie, { MovieDTO } from '../domain/Movie';
import MovieSearchResult from '../domain/MovieSearchResult';

export default class RemoteMovieRepository implements MovieRepository {
    findByName = async (name: string, requestedPage: number) => {
        const {
            data: { results, page, total_pages },
        }: AxiosResponse<{
            results: MovieDTO[];
            page: number;
            total_pages: number;
        }> = await axios.get(`/api/movies?name=${name}&page=${requestedPage}`);
        return new MovieSearchResult(
            results.map((movieDTO) => new Movie(movieDTO)),
            page,
            total_pages,
        );
    };
}
