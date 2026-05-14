import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </Head>
      <body className="bg-white text-ink-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
