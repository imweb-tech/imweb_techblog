import { useEffect, useState } from "react"
import type { TPost } from "@/types"

// 글 하단 액션 바. 좋아요(개인 localStorage 토글) + 공유하기(Web Share / 클립보드).
// 정적 사이트라 글로벌 좋아요 카운트는 지원하지 않습니다 — 표시는 본인 표시 용도입니다.
export default function PostActions({ post }: { post: TPost }) {
  const [liked, setLiked] = useState(false)
  const [shareLabel, setShareLabel] = useState<"공유하기" | "링크 복사됨">(
    "공유하기"
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      setLiked(window.localStorage.getItem(`like:${post.id}`) === "1")
    } catch {}
  }, [post.id])

  const toggleLike = () => {
    const next = !liked
    setLiked(next)
    try {
      window.localStorage.setItem(`like:${post.id}`, next ? "1" : "0")
    } catch {}
  }

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const data = { title: post.title, text: post.summary || "", url }

    const nav = typeof navigator !== "undefined" ? (navigator as any) : null

    if (nav?.share) {
      try {
        await nav.share(data)
        return
      } catch {
        // 사용자가 공유 시트를 닫은 경우 — fallback 으로 진행하지 않고 종료
        return
      }
    }

    if (nav?.clipboard?.writeText) {
      try {
        await nav.clipboard.writeText(url)
        setShareLabel("링크 복사됨")
        setTimeout(() => setShareLabel("공유하기"), 2000)
      } catch {}
    }
  }

  return (
    <div className="container mx-auto max-w-prose flex items-center justify-center gap-3 pt-2 pb-12">
      <button
        type="button"
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label="좋아요"
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border transition-colors ${
          liked
            ? "bg-pink-50 border-pink-200 text-pink-600"
            : "bg-white border-line text-ink-700 hover:border-ink-500 hover:text-ink-900"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>좋아요</span>
      </button>

      <button
        type="button"
        onClick={onShare}
        aria-label="공유하기"
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border bg-white border-line text-ink-700 hover:border-ink-500 hover:text-ink-900 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{shareLabel}</span>
      </button>
    </div>
  )
}
