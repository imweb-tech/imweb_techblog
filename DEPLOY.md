# 배포 가이드

이 프로젝트는 `imweb-tech/imweb_techblog` 저장소에 그대로 덮어쓸 수 있도록 구성되어 있습니다.

빌드 시 노션 데이터는 **비공식 Notion API(`notion-client`)** 로 가져옵니다. morethan-log 와 동일한 방식이고, **Integration 토큰이 필요하지 않습니다.** 대신 노션 DB 페이지가 "웹에 게시(Share to web)" 되어 있어야 합니다.

## 1. 노션 DB 공개 게시 (한 번만)

1. 대상 DB 페이지([링크](https://www.notion.so/imweb/09870e1112ce83098f628118b6ba9bb3))에서 우측 상단 `Share` → `Publish` 탭
2. `Publish to web` 활성화
3. (선택) `Search engine indexing` 끄기 — 구글 검색 노출은 막고, 우리 빌드만 접근하도록

URL은 그대로(`notion.so/imweb/...`) 유지되지만, 비로그인 상태에서도 비공식 API로 접근이 가능해집니다.

## 2. GitHub Pages 활성화

저장소의 **Settings → Pages**:
- Source: `GitHub Actions`

별도의 시크릿(NOTION_TOKEN 등) 등록은 필요 없습니다. 이전에 등록해 두었다면 그대로 두셔도 무방합니다 — 워크플로우는 더 이상 참조하지 않습니다.

## 3. 푸시 → 자동 배포

```bash
git add .
git commit -m "feat: 토스 스타일 리뉴얼 (notion-client 기반)"
git push origin main
```

`.github/workflows/deploy.yml` 이 `push: branches: [main]` 트리거 + 매시간 `schedule` 트리거(노션 변경 반영용)로 동작하여 GitHub Pages 로 자동 배포합니다.

배포 후 사이트는 [https://imweb-tech.github.io/imweb_techblog](https://imweb-tech.github.io/imweb_techblog) 에서 확인할 수 있습니다.

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:3000
```

토큰 없이 바로 동작합니다 (위 1번이 완료되어 있다는 전제).

## 로컬 정적 빌드 검증

```bash
npm run build
npx serve out -l 4000
```

`http://localhost:4000` 에서 `./out` 결과물이 그대로 GitHub Pages 와 동일하게 동작하는지 확인합니다.

## 노션에 새 글을 쓰면

- 빌드는 매시간 cron 으로 트리거되어 새 글이 사이트에 자동 반영됩니다.
- 즉시 반영이 필요하면 GitHub `Actions` 탭 → `Deploy to GitHub Pages` → `Run workflow` 로 수동 트리거.
- 로컬 dev 서버는 `getStaticProps` 결과를 캐시하므로 변경사항 확인 시 dev 서버를 재시작하세요.

## 트러블슈팅

- **빌드 단계에서 `missing user <uuid>` 경고** — 공개 게시된 페이지에는 작성자 정보가 빠져 있어 그렇습니다. 렌더링에 영향은 없습니다.
- **빌드가 실패하며 "page not found" 같은 메시지** — 1번 단계의 "Publish to web" 가 풀려있을 가능성이 큽니다. 다시 켜주세요.
- **글이 50건이 넘어가면** 첫 페이지만 가져올 수 있습니다. 그때는 `src/lib/notion/getPosts.ts` 에서 `notion.getCollectionData(...)` 페이지네이션을 보강해야 합니다.
- **이미지가 깨져요** — Notion 첨부 이미지는 만료되는 presigned URL 입니다. `src/lib/notion/mapPage.ts` 의 `resolveImageUrl` 이 `notion.so/image/...` 프록시 경로로 변환하므로 매시간 cron 빌드로 자연스럽게 갱신됩니다.

## 사용자 페이지(`imweb-tech.github.io`)로 배포하려면

workflow 의 `BASE_PATH` 출력을 무시하고 `BASE_PATH: ""` 로 강제 설정한 뒤, 저장소 이름을 `imweb-tech.github.io` 로 바꾸면 됩니다.
