import MovieSearchRequest from './MovieSearchRequest';
import MovieSearchResult from './MovieSearchResult';

export default interface MovieRepository {
    find: (request: MovieSearchRequest) => Promise<MovieSearchResult>;
}
