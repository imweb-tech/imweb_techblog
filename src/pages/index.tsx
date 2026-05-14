import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMemo, useState } from "react"
import Layout from "@/components/layout/Layout"
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
  // 빌드 타임에 Notion 에서 모든 글을 가져와 정적 생성.
  // NOTION_TOKEN 이 없으면 getPosts() 내부에서 fixture 데이터로 대체됩니다.
  const [posts, featured, categories, tags] = await Promise.all([
    getPosts(),
    getFeaturedPosts(CONFIG.home.featuredCount),
    getCategories(),
    getTags(),
  ])

  return {
    props: { posts, featured, categories, tags },
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
            {CONFIG.home.showFeatured && featured.length > 0 && !isFiltered && (
              <FeaturedPosts posts={featured} />
            )}

            <PostGrid posts={filtered} title={filterTitle} />

            {posts.length === 0 && (
              <div className="py-24 text-center">
                <div className="mb-3 text-2xl font-bold tracking-tight">아직 글이 없어요</div>
                <div className="text-ink-500">
                  Notion 데이터베이스 연동을 마치면 이 자리에 글이 나타납니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
