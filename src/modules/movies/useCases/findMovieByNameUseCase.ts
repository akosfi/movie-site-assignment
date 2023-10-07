import Movie from "../domain/Movie";
import MovieRepository from "../domain/MovieRepository"

export interface FindMovieByNameUseCaseRequest {
    movieRepository: MovieRepository;
    name: string;
    page: number;
}


export interface FindMovieByNameUseCaseResponse {
    movies: Movie[];
}

export default class FindMovieByNameUseCase {
    constructor(private readonly findMovieByNameUseCaseRequest: FindMovieByNameUseCaseRequest) { }

    execute = async (): Promise<FindMovieByNameUseCaseResponse> => {
        const { movieRepository, name, page } = this.findMovieByNameUseCaseRequest;

        const movies = await movieRepository.findByName(name, page);

        return { movies };
    }
}   