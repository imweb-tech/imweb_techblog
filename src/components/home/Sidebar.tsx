type Item = { name: string; count: number }

// 메인 페이지 좌측 사이드바. 카테고리/태그를 세로 리스트로 표시합니다.
// 클릭 시 부모(index) 가 보관한 active 상태를 변경합니다.
export default function Sidebar({
  categories,
  tags,
  activeCategory,
  activeTag,
  onCategoryChange,
  onTagChange,
}: {
  categories: Item[]
  tags: Item[]
  activeCategory: string | null
  activeTag: string | null
  onCategoryChange: (next: string | null) => void
  onTagChange: (next: string | null) => void
}) {
  const totalCategory = categories.reduce((s, c) => s + c.count, 0)
  const totalTag = tags.reduce((s, t) => s + t.count, 0)

  return (
    <aside className="lg:sticky lg:top-20 self-start">
      {categories.length > 0 && (
        <section className="mb-8">
          <div className="mb-3 text-xs font-semibold tracking-wider uppercase text-ink-500">
            카테고리
          </div>
          <ul className="flex flex-col">
            <li>
              <button
                type="button"
                onClick={() => {
                  onCategoryChange(null)
                  onTagChange(null)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeCategory === null && activeTag === null
                    ? "bg-ink-900 text-white font-medium"
                    : "text-ink-700 hover:bg-surface hover:text-ink-900"
                }`}
              >
                <span>전체</span>
                <span className="opacity-60 text-xs tabular-nums">{totalCategory}</span>
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => {
                    onCategoryChange(c.name)
                    onTagChange(null)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeCategory === c.name
                      ? "bg-ink-900 text-white font-medium"
                      : "text-ink-700 hover:bg-surface hover:text-ink-900"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="opacity-60 text-xs tabular-nums">{c.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tags.length > 0 && (
        <section>
          <div className="mb-3 text-xs font-semibold tracking-wider uppercase text-ink-500">
            태그
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => onTagChange(activeTag === t.name ? null : t.name)}
                className={`toss-chip text-xs ${
                  activeTag === t.name ? "is-active" : ""
                }`}
              >
                # {t.name}
                <span className="opacity-60">·{t.count}</span>
              </button>
            ))}
          </div>
          {tags.length > 0 && (
            <div className="mt-2 text-[11px] text-ink-500 px-1">
              총 {totalTag}개 태그 사용
            </div>
          )}
        </section>
      )}
    </aside>
  )
}
