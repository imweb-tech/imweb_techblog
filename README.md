# 아임웹 기술 블로그

[morethan-log](https://github.com/morethanmin/morethan-log) 를 베이스로, Notion 을 CMS 로 사용하고 [토스 기술블로그](https://toss.tech) 스타일의 레이아웃/그리드를 입힌 정적 사이트입니다. GitHub Pages 로 배포됩니다.

## 핵심 특징

- **공식 Notion API + 토큰** 기반 데이터 페치 (`@notionhq/client`)
- **토스 스타일 디자인 시스템**: Pretendard 한글 타이포, 카드형 그리드, Featured 히어로, 카테고리/태그 칩 필터
- **Next.js 14 정적 export** (`output: "export"`) → GitHub Pages 정적 호스팅
- **GitHub Actions 자동 빌드/배포** + 매시간 cron 재빌드로 Notion 변경사항 반영

## 빠른 시작

### 1. 의존성 설치

```bash
yarn install
# 또는 npm install
```

### 2. 환경 변수 설정

`.env.example` 을 `.env.local` 로 복사한 뒤 본인의 값으로 채워주세요.

```bash
cp .env.example .env.local
```

| 키                  | 설명                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `NOTION_TOKEN`      | https://www.notion.so/my-integrations 에서 발급한 Internal Integration Token (`secret_...`) |
| `NOTION_DATABASE_ID`| Notion 데이터베이스 URL 의 32자리 ID. 기본값은 imweb 워크스페이스의 기술블로그 DB 입니다.       |
| `GITHUB_PAGES`      | GitHub Pages 프로젝트 페이지로 빌드할 때 `true`                                            |
| `BASE_PATH`         | 프로젝트 페이지 base path (예: `/imweb_techblog`)                                          |

#### Notion Integration 권한 부여

1. https://www.notion.so/my-integrations 에서 새 Integration 을 만듭니다.
2. 토큰을 `NOTION_TOKEN` 에 넣습니다.
3. 데이터베이스 페이지에서 우측 상단 `…` → `연결 추가` → 만든 Integration 선택. 이 단계가 빠지면 403 이 납니다.

### 3. 개발 서버

```bash
yarn dev
```

http://localhost:3000 접속.

### 4. 정적 빌드

```bash
yarn build
```

`./out` 디렉토리에 정적 사이트가 생성됩니다.

## Notion 데이터베이스 스키마

코드는 아래 속성명을 자동으로 인식합니다. 영문/한글 alias 를 모두 지원하므로 둘 중 하나만 있으면 됩니다.

| 속성          | 타입             | Alias                                            | 비고                                  |
| ------------- | ---------------- | ------------------------------------------------ | ------------------------------------- |
| 제목          | Title            | `Title`, `Name`, `제목`, `이름`                  | 필수                                  |
| 요약          | Rich text        | `Summary`, `Description`, `요약`, `설명`         | 카드/메타 description 에 사용         |
| 슬러그        | Rich text        | `Slug`, `slug`, `URL`                            | 없으면 제목으로 자동 생성              |
| 카테고리      | Select           | `Category`, `카테고리`, `Type`                   | 메인 페이지 카테고리 필터에 사용       |
| 태그          | Multi-select     | `Tags`, `태그`                                   | 태그 페이지 / 필터에 사용              |
| 작성자        | People           | `Author`, `Authors`, `작성자`, `People`          | 카드/상세 페이지에 표시                |
| 발행일        | Date             | `Date`, `Published`, `PublishedAt`, `발행일`     | 미설정 시 페이지 생성일 사용           |
| 상태          | Select           | `Status`, `상태`                                 | `Public` 만 노출. 기본 `Public`        |
| 추천          | Checkbox         | `Featured`, `추천`, `Pinned`                     | 메인 페이지 Featured 영역에 노출       |

## 디자인 커스터마이징

대부분의 값은 [`site.config.js`](./site.config.js) 한 파일에서 변경할 수 있습니다.

- 사이트 제목/설명/URL
- 브랜드 컬러 (토스 블루 기반)
- 네비게이션 메뉴
- Featured/페이지네이션 크기
- Notion 데이터베이스 ID 기본값
- Google Analytics 등 플러그인

Tailwind 토큰은 [`tailwind.config.js`](./tailwind.config.js) 에 정의되어 있고, prose/카드/칩 디테일 스타일은 [`src/styles/globals.css`](./src/styles/globals.css) 에서 조정합니다.

## GitHub Pages 배포

1. 저장소 Settings → Pages → **Source** 를 `GitHub Actions` 로 설정.
2. Settings → Secrets and variables → Actions 에서 아래 Secret 을 등록.
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
3. `main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동으로 `next build`(`output: "export"`) 후 `./out` 을 GitHub Pages 에 배포합니다.
4. 매시간 cron 으로 자동 재빌드되어 Notion 변경 사항이 반영됩니다 (필요 시 워크플로우의 `cron` 라인 조정).

### 사용자 페이지(imweb-tech.github.io)로 배포하려면

`next.config.js` 의 `basePath` 는 환경변수 `BASE_PATH` 로 제어됩니다. 사용자 페이지로 배포하는 경우 GitHub Actions 에서 `BASE_PATH=""` 로 비워두면 됩니다.

## 라이선스

원본 [morethan-log](https://github.com/morethanmin/morethan-log) 와 동일한 MIT 라이선스를 따릅니다.
