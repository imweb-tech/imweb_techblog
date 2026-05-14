import { NotionAPI } from "notion-client"

// 비공식(public) Notion API 클라이언트.
// 토큰이 필요 없으며, 노션 페이지가 "웹에 게시(Share to web)" 되어 있어야 합니다.
// morethan-log 와 동일한 방식.
export const notion = new NotionAPI()
