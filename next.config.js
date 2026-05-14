/** @type {import('next').NextConfig} */

// GitHub Pages 정적 배포 설정
// - 사용자 페이지(github.io)가 아닌 프로젝트 페이지(/imweb_techblog)일 경우 basePath 가 필요합니다.
// - CI 환경에서는 GITHUB_PAGES=true, BASE_PATH=/imweb_techblog 를 주입합니다.
const isProd = process.env.NODE_ENV === "production"
const isGithubPages = process.env.GITHUB_PAGES === "true"
const basePath = isGithubPages ? process.env.BASE_PATH || "/imweb_techblog" : ""

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
