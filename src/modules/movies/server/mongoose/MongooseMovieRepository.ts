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
            cachedMovieSearchResult.originalSearchResult
        ) {
            console.log('from cache');

            return JSON.parse(cachedMovieSearchResult.originalSearchResult);
        }

        const movieSearchResult =
            await this.theMovieDatabaseRepository.findByName(name, page);

        await (
            await MongooseMovieSearchResult.create({
                name,
                page,
                hit: 0,
                originalSearchResult: JSON.stringify(movieSearchResult),
                timestamp: String,
            })
        ).save();

        return movieSearchResult;
    };
}
