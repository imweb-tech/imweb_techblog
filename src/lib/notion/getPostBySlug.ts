import type { ExtendedRecordMap } from "notion-types"
import { notion, fetchPage } from "./client"
import { getPosts } from "./getPosts"
import { unwrap } from "./mapPage"
import type { TPost } from "@/types"

// 슬러그로 단일 글을 찾고, 본문 렌더링에 필요한 recordMap 까지 함께 반환합니다.
// recordMap 은 react-notion-x 의 <NotionRenderer recordMap={...} /> 에 그대로 전달됩니다.
export async function getPostBySlug(
  slug: string
): Promise<(TPost & { recordMap: ExtendedRecordMap }) | null> {
  const posts = await getPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return null

  const recordMap = await fetchPage(post.id)
  await enrichPageUsers(recordMap)
  return { ...post, recordMap }
}

// 공개 게시 페이지의 recordMap 에는 notion_user 가 비어있어,
// 페이지 블록·본문에 등장하는 모든 user_id 를 모아 한 번에 fetch 해 채워 넣습니다.
async function enrichPageUsers(recordMap: ExtendedRecordMap): Promise<void> {
  const userIds = new Set<string>()

  for (const record of Object.values(recordMap.block || {})) {
    const block = unwrap(record)
    if (!block) continue
    // 1) properties 안의 person/mention 참조
    if (block.properties) {
      for (const value of Object.values(block.properties) as any[][]) {
        if (!Array.isArray(value)) continue
        for (const seg of value) {
          const annotations = seg?.[1] || []
          for (const a of annotations) {
            if (a?.[0] === "u" && typeof a[1] === "string") userIds.add(a[1])
          }
        }
      }
    }
    // 2) block 의 작성자/편집자 메타
    if (block.created_by_table === "notion_user" && block.created_by_id) {
      userIds.add(block.created_by_id)
    }
    if (
      block.last_edited_by_table === "notion_user" &&
      block.last_edited_by_id
    ) {
      userIds.add(block.last_edited_by_id)
    }
  }

  if (userIds.size === 0) return

  try {
    const resp: any = await (notion as any).getUsers([...userIds])
    const merged = resp?.recordMapWithRoles?.notion_user
    if (merged) {
      recordMap.notion_user = {
        ...(recordMap.notion_user ?? {}),
        ...merged,
      }
    }
  } catch {
    // 사용자 정보 fetch 실패는 무시 (페이지는 계속 렌더링)
  }
}
