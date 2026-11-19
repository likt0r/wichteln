# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install build dependencies for native modules.
# nodejs: the Nuxt CLI runs under Node when available (as locally and in CI);
# Bun lacks node:module findPackageJSON, which nuxt-og-image needs at build time.
RUN apk add --no-cache python3 make g++ nodejs

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Note: Nuxt's .output contains all necessary dependencies, so we don't need to install them again

# Copy built application from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

# Copy migration files and package.json
COPY --from=builder --chown=nuxtjs:nodejs /app/server/database ./server/database
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# Install ONLY production dependencies for the migration script
# We need to switch to root briefly to install, or ensure permissions are correct
USER root
RUN bun install --production --frozen-lockfile

# Create necessary directories with proper permissions
# These directories need to be writable by the nuxtjs user at runtime
RUN mkdir -p /app/files && \
    chown -R nuxtjs:nodejs /app/files && \
    chmod -R 755 /app/files 
RUN mkdir -p /database && \
    chown -R nuxtjs:nodejs /database && \
    chmod -R 755 /database

# Copy necessary directories if they exist in source
# These are needed at runtime for the application
COPY --chown=nuxtjs:nodejs public ./public

# Set environment to production
ENV NODE_ENV=production
ENV NITRO_PRESET=bun
ENV SQLITE_DB_PATH=/database/sqlite.db

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Run migrations then start the application.
# nuxt-og-image signs OG image URLs with NUXT_APP_SECRET (min. 32 chars). Set it in the
# environment to keep signed URLs valid across restarts; otherwise a random one is generated.
CMD ["sh", "-c", "export NUXT_APP_SECRET=\"${NUXT_APP_SECRET:-$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \\n')}\" && bun db:migrate && bun .output/server/index.mjs"]
