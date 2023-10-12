import { FindMovieUseCase, MovieSearchRequest } from 'core/movies';
import { NextApiRequest, NextApiResponse } from 'next';
import { TheMovieDatabaseRepository } from 'server/modules/movies';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { movieSearchResult } = await new FindMovieUseCase({
        movieRepository: new TheMovieDatabaseRepository(),
        movieSearchRequest: new MovieSearchRequest(
            String(request.query.name || ''),
            Number(request.query.page || 1),
        ),
    }).execute();

    return response.send(movieSearchResult);
};
