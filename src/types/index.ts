// 공통 타입 정의. Notion API 응답은 NotionPage 가 그대로 들고 있고,
// 화면에서 다루는 가공된 형태는 TPost 입니다.

export type TPostStatus = "Public" | "Private" | "Draft"

export type TAuthor = {
  name: string
  avatar?: string
}

export type TPost = {
  id: string
  slug: string
  title: string
  summary: string
  cover: string | null
  category: string | null
  tags: string[]
  authors: TAuthor[]
  date: string // ISO 8601
  status: TPostStatus
  featured: boolean
}

export type TPostListResponse = {
  posts: TPost[]
  total: number
}
