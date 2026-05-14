// 한국어 친화적 날짜 포맷 유틸.
// "2026-05-13" → "2026년 5월 13일"
export const formatDate = (iso: string): string => {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${y}년 ${m}월 ${day}일`
}

// 글 목록 카드용 짧은 포맷. "2026.05.13"
export const formatDateShort = (iso: string): string => {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}

// 토스 스타일에서 자주 쓰는 "n일 전" 상대 포맷.
export const formatRelative = (iso: string): string => {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return "방금 전"
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}일 전`
  return formatDateShort(iso)
}
