import "react-notion-x/src/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import "katex/dist/katex.min.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

const CONFIG = require("../../site.config")

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content={CONFIG.brand.primary} />
        <title>{CONFIG.blog.title}</title>
        <meta name="description" content={CONFIG.blog.description} />
        <link rel="icon" type="image/svg+xml" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg`} />
        <link rel="icon" type="image/x-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/apple-touch-icon.png`} />
        <meta property="og:title" content={CONFIG.blog.title} />
        <meta property="og:description" content={CONFIG.blog.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={CONFIG.blog.title} />
        <meta property="og:image" content={`${CONFIG.blog.siteUrl}/og-default.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${CONFIG.blog.siteUrl}/og-default.png`} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
