// 사이트 전역 설정. 운영중에는 이 파일만 수정해도 대부분의 항목을 변경할 수 있습니다.
const CONFIG = {
  // ── 사이트 기본 정보 ──────────────────────────────────────────────────────
  blog: {
    title: "아임웹 테크",
    description: "아임웹 기술 조직의 이야기를 담습니다.",
    author: "Imweb Tech",
    language: "ko-KR",
    timezone: "Asia/Seoul",
    siteUrl: "https://imweb-tech.github.io/imweb_techblog",
    ogImage: "/og-default.png",
    favicon: "/favicon.ico",
  },

  // ── 브랜드 컬러 ─────────────────────────────────────────────────────────
  // 차분한 흑백 + 강한 포커스 블루.
  brand: {
    primary: "#3182F6", // 브랜드 블루
    primaryDark: "#1B64DA",
    accent: "#0064FF",
    text: "#191F28",
    subtext: "#4E5968",
    muted: "#8B95A1",
    surface: "#F9FAFB",
    border: "#E5E8EB",
    background: "#FFFFFF",
  },

  // ── Notion 연동 ──────────────────────────────────────────────────────────
  // 공식 Notion API 사용. .env.local 에 NOTION_TOKEN, NOTION_DATABASE_ID 를 설정하세요.
  notion: {
    // URL 의 `09870e1112ce83098f628118b6ba9bb3` 부분이 데이터베이스 ID 입니다.
    // 환경 변수로 덮어쓸 수 있도록 process.env 우선.
    databaseId:
      process.env.NOTION_DATABASE_ID || "09870e1112ce83098f628118b6ba9bb3",
    // posts 가 변경된 후 재빌드 주기(초). 정적 빌드에서는 ISR 이 동작하지 않으므로 참고용.
    revalidateTime: 60 * 60,
  },

  // ── 네비게이션 ───────────────────────────────────────────────────────────
  // external: true 면 새 탭으로 엽니다(외부 URL).
  nav: [
    { label: "글", href: "/" },
    { label: "채용", href: "https://career.imweb.me", external: true },
    { label: "개발자센터", href: "https://developers.imweb.me/", external: true },
  ],

  // ── 외부 링크 / 푸터 ────────────────────────────────────────────────────
  social: {
    homepage: "https://imweb.me",
    careers: "https://career.imweb.me",
    contactEmail: "tech@imweb.me",
  },

  // ── 회사 정보 (푸터 노출) ───────────────────────────────────────────────
  company: {
    name: "(주)아임웹",
    ceo: "이수모",
    privacyOfficer: "김형섭",
    businessNumber: "105-87-83592",
    ecommerceNumber: "제 2023-서울강남-02377",
    address: "서울 강남구 테헤란로 501 VPLEX",
  },

  // ── 메인 페이지 노출 옵션 ───────────────────────────────────────────────
  home: {
    showHero: false,
    showFeatured: true,
    featuredCount: 2,
    pageSize: 12,
  },

  // ── 댓글 (giscus) ───────────────────────────────────────────────────────
  // 1) 레포 Settings → General → Features → Discussions 활성화
  // 2) https://github.com/apps/giscus 설치 (해당 레포에 접근 권한 부여)
  // 3) https://giscus.app 에서 설정 마법사로 repoId / categoryId 받기
  // 4) 아래 값 채우고 enabled: true 로 변경
  comments: {
    giscus: {
      enabled: false,
      repo: "imweb-tech/imweb_techblog",
      repoId: "",
      category: "General",
      categoryId: "",
      mapping: "pathname", // 페이지 경로를 discussion 과 매핑
      lang: "ko",
      reactionsEnabled: "1",
      inputPosition: "bottom",
    },
  },

  // ── 플러그인 ─────────────────────────────────────────────────────────────
  plugins: {
    googleAnalytics: {
      enable: false,
      measurementId: "",
    },
  },
}

module.exports = CONFIG
