import { NextApiRequest, NextApiResponse } from 'next';
import { TheMovieDatabaseRepository } from 'modules/movies';
import { FindMovieByNameUseCase } from 'modules/movies/movie-listing-page';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { movieSearchResult } = await new FindMovieByNameUseCase({
        movieRepository: new TheMovieDatabaseRepository(),
        name: String(request.query.name || ''),
        page: Number(request.query.page || 1),
    }).execute();

    return response.send(movieSearchResult);
};
