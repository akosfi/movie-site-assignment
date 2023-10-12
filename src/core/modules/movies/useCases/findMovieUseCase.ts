import MovieRepository from '../domain/MovieRepository';
import MovieSearchRequest from '../domain/MovieSearchRequest';
import MovieSearchResult from '../domain/MovieSearchResult';

export interface FindMovieUseCaseRequest {
    movieRepository: MovieRepository;
    movieSearchRequest: MovieSearchRequest;
}

export interface FindMovieUseCaseResponse {
    movieSearchResult: MovieSearchResult;
}

export default class FindMovieUseCase {
    constructor(
        private readonly findMovieUseCaseRequest: FindMovieUseCaseRequest,
    ) {}

    execute = async (): Promise<FindMovieUseCaseResponse> => {
        const { movieRepository, movieSearchRequest } =
            this.findMovieUseCaseRequest;

        const movieSearchResult =
            await movieRepository.find(movieSearchRequest);

        return { movieSearchResult };
    };
}
