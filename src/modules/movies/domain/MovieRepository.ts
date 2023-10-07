import MovieSearchResult from "./MovieSearchResult";

export default interface MovieRepository {
    findByName: (name: string, page: number) => Promise<MovieSearchResult>;
}