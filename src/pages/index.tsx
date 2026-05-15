import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMemo, useState } from "react"
import Layout from "@/components/layout/Layout"
import Banner from "@/components/home/Banner"
import FeaturedPosts from "@/components/home/FeaturedPosts"
import PostGrid from "@/components/home/PostGrid"
import Sidebar from "@/components/home/Sidebar"
import {
  getPosts,
  getFeaturedPosts,
  getCategories,
  getTags,
} from "@/lib/notion/getPosts"

const CONFIG = require("../../site.config")

type Props = {
  posts: Awaited<ReturnType<typeof getPosts>>
  featured: Awaited<ReturnType<typeof getFeaturedPosts>>
  categories: Awaited<ReturnType<typeof getCategories>>
  tags: Awaited<ReturnType<typeof getTags>>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // 노션 API 가 일시적으로 실패해도 사이트 자체는 살아있도록 (빈 상태 UI) graceful fallback.
  // 영구 실패는 Actions 로그에서 console.error 로 추적 가능.
  try {
    const [posts, featured, categories, tags] = await Promise.all([
      getPosts(),
      getFeaturedPosts(CONFIG.home.featuredCount),
      getCategories(),
      getTags(),
    ])
    return { props: { posts, featured, categories, tags } }
  } catch (err) {
    console.error("[home] getStaticProps 실패 — 빈 상태로 fallback:", err)
    return { props: { posts: [], featured: [], categories: [], tags: [] } }
  }
}

export default function HomePage({
  posts,
  featured,
  categories,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false
      if (activeTag && !p.tags.includes(activeTag)) return false
      return true
    })
  }, [posts, activeCategory, activeTag])

  const hasSidebar = categories.length > 0 || tags.length > 0
  const isFiltered = Boolean(activeCategory || activeTag)
  const filterTitle = activeCategory
    ? activeCategory
    : activeTag
      ? `# ${activeTag}`
      : "전체 글"

  return (
    <Layout>
      <div className="container mx-auto pt-8 pb-24">
        <Banner />
        <div
          className={
            hasSidebar
              ? "grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-12"
              : ""
          }
        >
          {hasSidebar && (
            <Sidebar
              categories={categories}
              tags={tags}
              activeCategory={activeCategory}
              activeTag={activeTag}
              onCategoryChange={setActiveCategory}
              onTagChange={setActiveTag}
            />
          )}

          <div className="min-w-0">
            {posts.length === 0 ? (
              <div className="py-24 text-center">
                <div className="text-2xl font-bold tracking-tight">잠시만 기다려주세요.</div>
              </div>
            ) : (
              <>
                {CONFIG.home.showFeatured && featured.length > 0 && !isFiltered && (
                  <FeaturedPosts posts={featured} />
                )}
                <PostGrid posts={filtered} title={filterTitle} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
