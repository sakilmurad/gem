import '../styles/globals.css'
import Layout from '../src/Layout'
// import { data } from '../src/data.json'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import * as ga from "../src/ga";
const data = require("../src/data.json");
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()
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

  // show ads function 
  const ShowAdsense = () =>{
    var ads = document.getElementsByClassName("adsbygoogle");
    var adsLenght = ads.length
    for (var i = 0; i < adsLenght; i++) {
      ads[i].innerHTML = "";
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }

Router.onRouteChangeStart = () => {
  setLoading(true);
};

Router.onRouteChangeComplete = () => {
  ShowAdsense();
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
