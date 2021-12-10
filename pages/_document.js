import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
      return (
        <Html  lang="en">
            <Head>
            <meta name="robots" content="index, follow" />
            <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-03XG9SMRE5`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-03XG9SMRE5', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1680355976010606"
     crossOrigin="anonymous"></script>
          </Head >
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument