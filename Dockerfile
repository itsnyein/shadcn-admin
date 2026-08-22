FROM node:22-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV HUSKY=0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV HUSKY=0

ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG DATABASE_URL
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

RUN pnpm run build

# Stage 3: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
