import axios, { AxiosResponse } from "axios"
import MovieRepository from "../domain/MovieRepository";
import Movie, { MovieDTO } from "../domain/Movie";

export default class RemoteMovieRepository implements MovieRepository {
    findByName = async (name: string, page: number) => {
        const { data: { results } }: AxiosResponse<{ results: MovieDTO[] }> = await axios.get(`/api/movies?name=${name}&page=${page}`);
        return results.map((movieDTO) => new Movie(movieDTO)); //TODO: use factory
    }
}