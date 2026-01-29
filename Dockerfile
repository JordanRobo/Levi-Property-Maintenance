# Use official Bun image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy application files
FROM base AS release
COPY --from=install /app/node_modules ./node_modules
COPY . .

# Set production environment
ENV NODE_ENV=production

# Expose port (adjust if needed)
EXPOSE 3000

# Run the server directly - no bundling needed
CMD ["bun", "run", "--smol", "server/index.ts"]
