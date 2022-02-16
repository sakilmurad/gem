import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#1976d2" />
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:title" content="GeM Portal Course" />
          <meta property="og:site_name" content="GeM Portal Course" />
          <meta property="og:url" content="https://gpc.edafter.com/" />
          <meta
            property="og:description"
            content="Briefly explanation about GeM Bids, Catalogue creation, and all workflow on GeM"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://gpc.edafter.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl3tfsbn5%2Fimage%2Fupload%2Fv1643042307%2Fnew_logo_with_white_back_dw9i9l.svg&w=48&q=75"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
