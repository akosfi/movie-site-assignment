import Movie from "../domain/Movie";
import MovieRepository from "../domain/MovieRepository"
import MovieSearchResult from "../domain/MovieSearchResult";

export interface FindMovieByNameUseCaseRequest {
    movieRepository: MovieRepository;
    name: string;
    page: number;
}


export interface FindMovieByNameUseCaseResponse {
    movieSearchResult: MovieSearchResult;
}

export default class FindMovieByNameUseCase {
    constructor(private readonly findMovieByNameUseCaseRequest: FindMovieByNameUseCaseRequest) { }

    execute = async (): Promise<FindMovieByNameUseCaseResponse> => {
        const { movieRepository, name, page } = this.findMovieByNameUseCaseRequest;

        const movieSearchResult = await movieRepository.findByName(name, page);

        return { movieSearchResult };
    }
}   