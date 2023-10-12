import mongoose from 'mongoose';

const MongooseMovieSearchResult =
    mongoose.models['movieSearchResult'] ||
    mongoose.model(
        'movieSearchResult',
        new mongoose.Schema({
            name: String,
            page: Number,
            hit: Number,
            originalSearchResult: String,
            timestamp: String,
        }),
    );

export default MongooseMovieSearchResult;
