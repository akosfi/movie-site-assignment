import { FindMovieUseCase, MovieSearchRequest } from 'core/modules/movies';
import { NextApiRequest, NextApiResponse } from 'next';
import { withMongoDBConnected } from 'server/db';
import {
    MongooseMovieRepository,
    TheMovieDatabaseRepository,
} from 'server/modules/movies';

export default withMongoDBConnected(
    async (request: NextApiRequest, response: NextApiResponse) => {
        const { movieSearchResult } = await new FindMovieUseCase({
            movieRepository: new MongooseMovieRepository(
                new TheMovieDatabaseRepository(),
            ),
            movieSearchRequest: new MovieSearchRequest(
                String(request.query.name || ''),
                Number(request.query.page || 1),
            ),
        }).execute();

        return response.send(movieSearchResult);
    },
);
