const CONFIG = require("../../../site.config")

// 메인 페이지 상단 히어로. 큼지막한 디스플레이 타이포 + 짧은 부제목 패턴.
export default function Hero({ postCount }: { postCount: number }) {
  return (
    <section className="container mx-auto pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-700">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {CONFIG.blog.title}
        </div>
        <h1 className="text-[2.25rem] leading-[1.2] sm:text-[3.25rem] sm:leading-[1.15] font-bold tracking-[-0.03em] text-ink-900">
          우리는 어떻게
          <br />
          <span className="text-brand">제품을 만들고 있는가</span>
        </h1>
        <p className="mt-5 text-lg text-ink-700 sm:text-xl max-w-2xl leading-relaxed">
          아임웹 엔지니어들의 기술 이야기, 의사결정 과정, 그리고 시행착오를 가감 없이 공유합니다.
        </p>
        <div className="mt-6 text-sm text-ink-500">
          현재 <span className="font-semibold text-ink-900">{postCount}</span>개의 글이 발행되었어요.
        </div>
      </div>
    </section>
  )
}
