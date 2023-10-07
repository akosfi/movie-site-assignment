import { NextApiRequest, NextApiResponse } from "next";
import axios, { type AxiosResponse } from "axios"
import { MovieDTO } from "modules/movies";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { data }: AxiosResponse<{ page: number; results: MovieDTO[]; total_pages: number }> = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${request.query.name}&include_adult=false&language=en-US&page=${request.query.page}`, { headers: { "Authorization": `Bearer ${process.env.MOVIE_DB_ACCESS_TOKEN}`, Accept: "application/json" } })
    return response.send(data);
}


