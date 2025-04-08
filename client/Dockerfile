# 의존성 설치 단계
FROM node:18-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 빌더 단계
FROM node:18-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 환경변수 설정
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN pnpm build

# 런너 단계
FROM node:18-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# Next.js 실행을 위한 시스템 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 빌드 결과물만 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 실행 환경 설정
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 서버 실행
CMD ["node", "server.js"]
