import type { TPost } from "@/types"
import PostCard from "./PostCard"

// 메인 페이지 Featured 영역. 큰 히어로 카드 + 보조 카드 패턴.
// 1개일 때는 와이드 카드, 2개 이상일 때는 좌(큰) + 우(작은 2장) 레이아웃.
export default function FeaturedPosts({ posts }: { posts: TPost[] }) {
  if (!posts.length) return null

  const [primary, ...rest] = posts
  const secondary = rest.slice(0, 2)

  return (
    <section className="container mx-auto pb-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-h2 sm:text-[1.875rem] font-bold tracking-[-0.025em] text-ink-900">
          Featured
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PostCard post={primary} variant="featured" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {secondary.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
