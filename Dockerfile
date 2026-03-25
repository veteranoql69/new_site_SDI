FROM node:20-alpine AS base

# Step 1: Install dependencies and build the app
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Step 2: Extract standalone files and run the optimized production server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# server.js is automatically created by next.js in standalone mode
CMD ["node", "server.js"]
