import '../styles/globals.css'
import Layout from '../src/Layout'
import { data } from '../src/data'
import Router from 'next/router';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);
Router.onRouteChangeStart = () => {
  setLoading(true);
  console.log('onRouteChangeStart triggered');
};

Router.onRouteChangeComplete = () => {
  setLoading(false);
  console.log('onRouteChangeComplete triggered');
};

Router.onRouteChangeError = () => {
  setLoading(false);
  console.log('onRouteChangeError triggered');
};

  return(<>
    <Layout data={data} isLoading={isLoading}>
      <Component {...pageProps} />
    </Layout>
    </>
  ) 
}


export default MyApp
