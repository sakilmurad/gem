import '../styles/globals.css'
import Layout from '../src/Layout'
// import { data } from '../src/data.json'
import Router from 'next/router';
import { useState } from 'react';

const data = require("../src/data.json");

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);
Router.onRouteChangeStart = () => {
  setLoading(true);
};

Router.onRouteChangeComplete = () => {
  setLoading(false);
};

Router.onRouteChangeError = () => {
  setLoading(false);
};

  return(<>
    <Layout data={data} isLoading={isLoading}>
      <Component {...pageProps} />
    </Layout>
    </>
  ) 
}


export default MyApp
