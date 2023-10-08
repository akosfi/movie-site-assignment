import { ListingPage as ListingPageContent } from 'modules/movies/movie-listing-page/client';
import Head from 'next/head';

const ListingPage = () => (
    <>
        <Head>
            <title>The Movie Site</title>
        </Head>
        <ListingPageContent />
    </>
);

export default ListingPage;
