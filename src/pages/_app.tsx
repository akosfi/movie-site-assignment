import { MoviesProvider } from 'modules/movies';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Fingertips Store</title>
            </Head>
            <MoviesProvider>
                <Component {...pageProps} />
            </MoviesProvider>
        </>
    );
}
