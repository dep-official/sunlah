FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:18-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

EXPOSE 4000
CMD ["pnpm", "start:prod"] 