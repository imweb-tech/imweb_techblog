.PHONY: dev build export clean install lint type-check

install:
	yarn install

dev:
	yarn dev

build:
	yarn build

# next.config.js 에서 output: 'export' 를 사용하므로 build 만으로 ./out 이 생성됩니다.
export: build

clean:
	rm -rf .next out node_modules/.cache

lint:
	yarn lint

type-check:
	yarn type-check
