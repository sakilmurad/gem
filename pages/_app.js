import '../styles/globals.css'
import Layout from '../src/Layout'
// import { data } from '../src/data.json'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import * as ga from "../src/ga";
const data = require("../src/data.json");
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const ShowAdsense = () =>{
    var ads = document.getElementsByClassName("adsbygoogle");
    var adsLenght = ads.length;
    for (var i = 0; i < adsLenght; i++) {
      ads[i].innerHTML = "";
    }
    for (var i = 0; i < adsLenght; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }

  useEffect(() => {
    const handleRouteChange = (url) => {
      ShowAdsense();
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
