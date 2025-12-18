.PHONY: install dev build lint format clean typecheck

install:
	yarn install --frozen-lockfile

typecheck:
	yarn tsc --noEmit

dev:
	yarn dev

build:
	yarn build

lint:
	yarn lint

format:
	yarn format

clean:
	yarn clean
