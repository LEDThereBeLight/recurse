import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    const { Links, Meta } = this

    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <Links />
          <Meta />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  Links = React.memo(
    Object.assign(
      () => (
        <>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </>
      ),
      { displayName: 'Links' }
    )
  )

  Meta = React.memo(
    Object.assign(
      () => (
        <>
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
        </>
      ),
      { displayName: 'Meta' }
    )
  )
}
