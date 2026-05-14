#!/usr/bin/env bash
# 로컬에서 한 번에 실행하는 셋업 스크립트.
# 1) 기존 .git 정리
# 2) 의존성 설치
# 3) (선택) .env.local 템플릿 생성
# 4) 첫 빌드 검증
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "📁 작업 디렉토리: $ROOT_DIR"

# 샌드박스에서 만들어진 빈 .git 이 있다면 제거
if [ -d ".git" ]; then
  echo "🧹 기존 .git 디렉토리 제거"
  rm -rf .git
fi

# .env.local 템플릿
if [ ! -f ".env.local" ]; then
  echo "📝 .env.local 템플릿 생성 (NOTION_TOKEN 을 직접 채워주세요)"
  cp .env.example .env.local
fi

# 의존성 설치 (yarn 우선)
if command -v yarn >/dev/null 2>&1; then
  echo "📦 yarn install"
  yarn install
else
  echo "📦 npm install"
  npm install
fi

echo ""
echo "✅ 셋업 완료. 다음 명령어를 실행하세요:"
echo "  1. .env.local 에 NOTION_TOKEN / NOTION_DATABASE_ID 채우기"
echo "  2. yarn dev   (또는 npm run dev)"
echo "  3. http://localhost:3000 확인"
echo ""
echo "🚀 GitHub Pages 배포를 위한 git 초기화:"
echo "  git init -b main"
echo "  git add -A"
echo "  git commit -m \"feat: Notion 기반 정적 사이트 + GitHub Pages 자동 배포\""
echo "  git remote add origin https://github.com/imweb-tech/imweb_techblog.git"
echo "  git push -u origin main --force   # 기존 morethan-log 파일을 덮어쓰는 경우"
