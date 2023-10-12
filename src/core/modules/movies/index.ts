export { default as Movie, type MovieDTO } from './domain/Movie';
export { type default as MovieRepository } from './domain/MovieRepository';
export {
    default as MovieSearchResult,
    ResultOrigin,
} from './domain/MovieSearchResult';
export { default as MovieSearchRequest } from './domain/MovieSearchRequest';
export { default as FindMovieUseCase } from './useCases/findMovieUseCase';
