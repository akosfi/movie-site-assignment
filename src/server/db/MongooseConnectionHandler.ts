import mongoose from 'mongoose';

export default class MongooseConnectionHandler {
    connect = async () => {
        const mongodbURI = process.env.MONGODB_URI;

        if (!mongodbURI) {
            throw new Error('Failed to connect to database.');
        }

        let connectionState = mongoose.connection.readyState;

        while (connectionState === 2) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            connectionState = mongoose.connection.readyState;
        }

        if (connectionState !== 1) {
            await mongoose.connect(mongodbURI);
        }
    };
}
