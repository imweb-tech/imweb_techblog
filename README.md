# 아임웹 기술 블로그

[morethan-log](https://github.com/morethanmin/morethan-log) 를 베이스로, Notion 을 CMS 로 사용하는 정적 사이트입니다. GitHub Pages 로 배포됩니다.

## 핵심 특징

- **notion-client(비공식 Notion API) 기반 데이터 페치** — 토큰 불필요. 노션 DB 가 "웹에 게시" 되어 있으면 빌드 시 자동으로 가져옵니다.
- **카드형 그리드 + 좌측 카테고리·태그 사이드바 + Featured 히어로** 메인 레이아웃, Pretendard 한글 타이포.
- **`react-notion-x`** 로 본문 블록(코드/콜아웃/이미지/수식) 렌더링.
- **Next.js 14 정적 export** (`output: "export"`) → GitHub Pages 정적 호스팅.
- **GitHub Actions 자동 빌드/배포** + 매시간 cron 재빌드로 Notion 변경사항 반영.

## 빠른 시작

```bash
npm install
npm run dev
```

http://localhost:3000 접속. 별도의 환경 변수 없이 바로 동작합니다 (DB 가 "웹에 게시" 되어 있다는 전제).

### 정적 빌드

```bash
npm run build
```

`./out` 디렉토리에 정적 사이트가 생성됩니다.

## Notion 데이터베이스 스키마

코드는 아래 속성명을 자동으로 인식합니다 (대소문자 무시, 한글 alias 도 함께 지원).

| 속성       | 타입         | Alias                            | 비고                                |
| ---------- | ------------ | -------------------------------- | ----------------------------------- |
| title      | Title        | (필수)                           | 글 제목                             |
| slug       | Text         | `slug`, `url`                    | 없으면 제목으로 자동 생성           |
| status     | Select       | `status`, `상태`                 | `Public` 만 노출                    |
| category   | Select       | `category`, `카테고리`           | 좌측 사이드바 카테고리 필터에 사용  |
| tags       | Multi-select | `tags`, `태그`                   | 좌측 사이드바 태그 필터에 사용      |
| summary    | Text         | `summary`, `description`, `요약` | 카드/메타 description 에 사용       |
| date       | Date         | `date`, `published`, `발행일`    | 미설정 시 페이지 생성일 사용        |
| thumbnail  | File         | `thumbnail`, `cover`, `썸네일`   | 카드 썸네일/OG 이미지에 사용        |
| author     | Person       | `author`, `authors`, `작성자`    | 카드/상세 페이지에 표시 (선택)      |
| featured   | Checkbox     | `featured`, `추천`, `pinned`     | Featured 영역에 노출 (선택)         |

## 디자인 커스터마이징

대부분의 값은 [`site.config.js`](./site.config.js) 한 파일에서 변경할 수 있습니다.

- 사이트 제목/설명/URL
- 브랜드 컬러
- 네비게이션 메뉴
- Featured/페이지네이션 크기
- Notion 데이터베이스 ID
- Google Analytics 등 플러그인

Tailwind 토큰은 [`tailwind.config.js`](./tailwind.config.js) 에, 본문(`prose-body`)/카드(`lift-card`)/칩(`chip`) 스타일은 [`src/styles/globals.css`](./src/styles/globals.css) 에서 조정합니다.

## GitHub Pages 배포

1. 노션 DB 페이지에서 `Share` → `Publish` → "Publish to web" 활성화.
2. 저장소 Settings → Pages → **Source** 를 `GitHub Actions` 로 설정.
3. `main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동으로 `next build` 후 `./out` 을 GitHub Pages 에 배포합니다.
4. 매시간 cron 으로 자동 재빌드되어 Notion 변경 사항이 반영됩니다 (필요 시 워크플로우의 `cron` 라인 조정).

별도의 시크릿(`NOTION_TOKEN` 등) 등록은 필요 없습니다.

자세한 절차는 [DEPLOY.md](./DEPLOY.md) 참고.

### 사용자 페이지(imweb-tech.github.io)로 배포하려면

`next.config.js` 의 `basePath` 는 환경변수 `BASE_PATH` 로 제어됩니다. 사용자 페이지로 배포하는 경우 GitHub Actions 에서 `BASE_PATH=""` 로 비워두면 됩니다.

## 라이선스

원본 [morethan-log](https://github.com/morethanmin/morethan-log) 와 동일한 MIT 라이선스를 따릅니다.
