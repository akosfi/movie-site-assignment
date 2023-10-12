import Movie from './Movie';

export enum ResultOrigin {
    EXTERNAL = 'EXTERNAL',
    CACHED = 'CACHED',
}

export default class MovieSearchResult {
    movies: Movie[];

    page: number;

    totalPages: number;

    origin: ResultOrigin;

    constructor(
        movies: Movie[],
        page: number,
        totalPages: number,
        origin: ResultOrigin,
    ) {
        this.movies = movies;
        this.page = page;
        this.totalPages = totalPages;
        this.origin = origin;
    }
}
