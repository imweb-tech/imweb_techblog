import type { TPost } from "@/types"
import PostCard from "./PostCard"

// 메인 페이지 Featured 영역. 2개 글을 좌우 균등 grid 로 표시합니다.
// 일반 카드(variant default) 를 사용해 컴팩트한 높이를 유지합니다.
export default function FeaturedPosts({ posts }: { posts: TPost[] }) {
  if (!posts.length) return null

  const items = posts.slice(0, 2)

  return (
    <section className="container mx-auto pt-10 pb-12">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-h2 sm:text-[1.75rem] font-bold tracking-[-0.025em] text-ink-900">
          Featured
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
