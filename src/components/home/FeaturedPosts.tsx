import type { TPost } from "@/types"
import PostCard from "./PostCard"

// 메인 페이지 상단 "최근 글" 영역. 2개 글을 좌우 균등 grid 로 표시합니다.
// 부모에서 container 를 잡으므로 여기서는 wrapping 만 합니다.
export default function FeaturedPosts({ posts }: { posts: TPost[] }) {
  if (!posts.length) return null

  const items = posts.slice(0, 2)

  return (
    <section className="pt-2 pb-10">
      <div className="mb-5">
        <h2 className="text-h2 sm:text-[1.75rem] font-bold tracking-[-0.025em] text-ink-900">
          최근 글
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
