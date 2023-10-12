import {
    MovieRepository,
    MovieSearchRequest,
    MovieSearchResult,
    ResultOrigin,
} from 'core/modules/movies';
import TheMovieDatabaseRepository from '../theMovieDatabase/TheMovieDatabaseRepository';
import MongooseMovieSearchResult from './MongooseMovieSearchResult';

export default class MongooseMovieRepository implements MovieRepository {
    constructor(
        private readonly theMovieDatabaseRepository: TheMovieDatabaseRepository,
    ) {}

    find = async (movieSearchRequest: MovieSearchRequest) => {
        const cachedMovieSearchResult = await MongooseMovieSearchResult.findOne(
            { name: movieSearchRequest.name, page: movieSearchRequest.page },
        );

        if (
            cachedMovieSearchResult &&
            cachedMovieSearchResult.originalSearchResult &&
            typeof cachedMovieSearchResult.hit !== 'undefined' &&
            typeof cachedMovieSearchResult.timestamp !== 'undefined'
        ) {
            const elapsedMinutesSinceFirstCached =
                (new Date().getTime() - cachedMovieSearchResult.timestamp) /
                1000 /
                60;

            if (elapsedMinutesSinceFirstCached <= 2) {
                cachedMovieSearchResult.hit += 1;
                await cachedMovieSearchResult.save();

                const parsedOriginalSearchResult = JSON.parse(
                    cachedMovieSearchResult.originalSearchResult,
                );
                return new MovieSearchResult(
                    parsedOriginalSearchResult.movies,
                    parsedOriginalSearchResult.page,
                    parsedOriginalSearchResult.totalPages,
                    ResultOrigin.CACHED,
                );
            } else {
                await MongooseMovieSearchResult.findByIdAndDelete(
                    cachedMovieSearchResult?.id,
                );
            }
        }

        const movieSearchResult =
            await this.theMovieDatabaseRepository.find(movieSearchRequest);

        await (
            await MongooseMovieSearchResult.create({
                name: movieSearchRequest.name,
                page: movieSearchRequest.page,
                hit: 0,
                originalSearchResult: JSON.stringify(movieSearchResult),
                timestamp: new Date().getTime(),
            })
        ).save();

        return movieSearchResult;
    };
}
