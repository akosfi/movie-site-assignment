import { NextApiHandler } from 'next';
import MongooseConnectionHandler from 'server/db/MongooseConnectionHandler';

export default (nextAPIHandler: NextApiHandler) =>
    async (...args: Parameters<NextApiHandler>) => {
        try {
            await new MongooseConnectionHandler().connect();
            return await nextAPIHandler(...args);
        } catch (error) {
            const response = args[1];
            return response
                .status(500)
                .send({ message: 'Internal server error.' });
        }
    };
