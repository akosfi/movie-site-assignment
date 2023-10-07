import Movie from './Movie';

export default class MovieSearchResult {
    movies: Movie[];

    page: number;

    totalPages: number;

    constructor(movies: Movie[], page: number, totalPages: number) {
        this.movies = movies;
        this.page = page;
        this.totalPages = totalPages;
    }
}
