import { NextApiRequest, NextApiResponse } from 'next';
import { FindMovieByNameUseCase } from 'modules/movies/movie-listing-page';
import MongooseMovieRepository from 'modules/movies/infrastructure/server/mongoose/MongooseMovieRepository';
import TheMovieDatabaseRepository from 'modules/movies/infrastructure/server/theMovieDatabase/TheMovieDatabaseRepository';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { movieSearchResult } = await new FindMovieByNameUseCase({
        movieRepository: new MongooseMovieRepository(
            new TheMovieDatabaseRepository(),
        ),
        name: String(request.query.name || ''),
        page: Number(request.query.page || 1),
    }).execute();

    return response.send(movieSearchResult);
};
