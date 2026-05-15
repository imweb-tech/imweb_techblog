import { NotionAPI } from "notion-client"

// 비공식(public) Notion API 클라이언트.
// 토큰이 필요 없으며, 노션 페이지가 "웹에 게시(Share to web)" 되어 있어야 합니다.
export const notion = new NotionAPI()

// 빌드 안정성:
//   - 5xx / 네트워크 오류 시 자동 재시도 (1s, 2s, 4s)
//   - 컬렉션 쿼리 에러는 silently swallow 하지 않고 throw → 재시도 트리거
// 노션 API 가 일시적 502 를 자주 돌려주는데, 이 옵션 없이 진행하면
// 빈 데이터로 빌드가 통과하여 "아직 글이 없어요" 사이트가 배포되는 사고가 생김.
const DEFAULT_FETCH_OPTIONS = {
  throwOnCollectionErrors: true,
  ofetchOptions: { retry: 3, retryDelay: 1000 },
} as const

export const fetchPage = (pageId: string) =>
  notion.getPage(pageId, DEFAULT_FETCH_OPTIONS as any)
