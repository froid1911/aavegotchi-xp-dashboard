import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <div>
    <Head>
      <meta charSet="utf-8"/><link rel="preload" href="/fonts/Pixelar Regular.woff2" as="font" cross-origin="*"/>
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp
