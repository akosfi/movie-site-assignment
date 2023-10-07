import Movie from "./Movie";

export default interface MovieRepository {
    findByName: (name: string, page: number) => Promise<Movie[]>;
}