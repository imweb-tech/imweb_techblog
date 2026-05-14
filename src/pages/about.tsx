import Layout from "@/components/layout/Layout"

const CONFIG = require("../../site.config")

export default function AboutPage() {
  return (
    <Layout>
      <section className="container mx-auto max-w-prose pt-16 pb-24">
        <h1 className="text-h1 sm:text-[2.5rem] font-bold tracking-[-0.025em] text-ink-900">
          소개
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-700">
          {CONFIG.blog.description}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={CONFIG.social.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="toss-card block rounded-card border border-line p-6 hover:bg-surface"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              Imweb
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight">아임웹 →</div>
            <p className="mt-2 text-sm text-ink-700">
              누구나 자신의 비즈니스를 시작할 수 있도록 돕는 노코드 플랫폼.
            </p>
          </a>
          <a
            href={CONFIG.social.careers}
            target="_blank"
            rel="noopener noreferrer"
            className="toss-card block rounded-card border border-line p-6 hover:bg-surface"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              Careers
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight">함께 만들어요 →</div>
            <p className="mt-2 text-sm text-ink-700">
              아임웹의 다음 챕터를 함께 만들어갈 동료를 찾고 있어요.
            </p>
          </a>
        </div>
      </section>
    </Layout>
  )
}
