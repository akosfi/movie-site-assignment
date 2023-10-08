import { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    return response.send('Hey');
};
