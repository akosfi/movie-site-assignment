import MovieRepository from 'modules/movies/domain/MovieRepository';
import TheMovieDatabaseRepository from '../theMovieDatabase/TheMovieDatabaseRepository';
import MongooseMovieSearchResult from './MongooseMovieSearchResult';
import mongoose from 'mongoose';

export default class MongooseMovieRepository implements MovieRepository {
    constructor(
        private readonly theMovieDatabaseRepository: TheMovieDatabaseRepository,
    ) {}

    findByName = async (name: string, page: number) => {
        await mongoose.connect('mongodb://127.0.0.1:27017/movieCache');

        const cachedMovieSearchResult = await MongooseMovieSearchResult.findOne(
            { name, page },
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

                return JSON.parse(cachedMovieSearchResult.originalSearchResult);
            } else {
                await MongooseMovieSearchResult.findByIdAndDelete(
                    cachedMovieSearchResult?.id,
                );
            }
        }

        const movieSearchResult =
            await this.theMovieDatabaseRepository.findByName(name, page);

        await (
            await MongooseMovieSearchResult.create({
                name,
                page,
                hit: 0,
                originalSearchResult: JSON.stringify(movieSearchResult),
                timestamp: new Date().getTime(),
            })
        ).save();

        return movieSearchResult;
    };
}
