import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../client/styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from 'client/redux/store';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>The Movie Site</title>
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}
