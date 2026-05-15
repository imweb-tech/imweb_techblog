import type { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { getPosts, getTags } from "@/lib/notion/getPosts"

type Props = {
  tags: Awaited<ReturnType<typeof getTags>>
  total: number
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [posts, tags] = await Promise.all([getPosts(), getTags()])
    return { props: { tags, total: posts.length } }
  } catch (err) {
    console.error("[tags] getStaticProps 실패 — 빈 상태로 fallback:", err)
    return { props: { tags: [], total: 0 } }
  }
}

export default function TagsPage({
  tags,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <section className="container mx-auto pt-16 pb-16">
        <h1 className="text-h1 sm:text-[2.5rem] font-bold tracking-[-0.025em] text-ink-900">
          태그
        </h1>
        <p className="mt-3 text-ink-500">
          현재 {total}개의 글에서 추출된 {tags.length}개의 태그
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/?tag=${encodeURIComponent(t.name)}`}
              className="chip text-base"
            >
              # {t.name}
              <span className="opacity-60">·{t.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}
