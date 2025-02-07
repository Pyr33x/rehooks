FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

COPY ./src ./src
COPY react.json react.json
COPY next.json next.json

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 1337