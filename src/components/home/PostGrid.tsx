import type { TPost } from "@/types"
import PostCard from "./PostCard"

// 메인 페이지의 카드형 그리드. 모바일 1열, 태블릿 2열, 데스크탑 3열.
export default function PostGrid({
  posts,
  title = "최신 글",
}: {
  posts: TPost[]
  title?: string
}) {
  if (!posts.length) {
    return (
      <section className="py-16 text-center text-ink-500">
        조건에 맞는 글이 아직 없어요.
      </section>
    )
  }

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-h2 sm:text-[1.875rem] font-bold tracking-[-0.025em] text-ink-900">
          {title}
        </h2>
        <div className="text-sm text-ink-500">{posts.length}개</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
