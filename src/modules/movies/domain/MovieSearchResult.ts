import Movie from './Movie';

export type MovieSearchResultOrigin = 'CACHED' | 'EXTERNAL';

export default class MovieSearchResult {
    movies: Movie[];

    page: number;

    totalPages: number;

    origin: MovieSearchResultOrigin;

    constructor(
        movies: Movie[],
        page: number,
        totalPages: number,
        origin: MovieSearchResultOrigin,
    ) {
        this.movies = movies;
        this.page = page;
        this.totalPages = totalPages;
        this.origin = origin;
    }
}
