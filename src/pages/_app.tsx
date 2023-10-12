import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../client/styles/globals.scss';
import { MoviesProvider } from 'client/modules/movies';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MoviesProvider>
            <Head>
                <title>The Movie Site</title>
            </Head>
            <Component {...pageProps} />
        </MoviesProvider>
    );
}
