import '../styles/globals.css'
import Layout from '../src/Layout'
import { useState, useEffect } from 'react';
import * as ga from "../src/ga";
const data = require("../src/data.json");
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return(<>
    <Layout data={data}>
      <Component {...pageProps} />
    </Layout>
    </>
  ) 
}


export default MyApp
