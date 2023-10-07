import { MoviesProvider } from 'modules/movies';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

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
