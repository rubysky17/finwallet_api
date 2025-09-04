FROM oven/bun:1 AS base

ARG PROJECT_DIR

ENV DB_HOST=mysql \
    APP_PORT=7001

WORKDIR $PROJECT_DIR
COPY ./ $PROJECT_DIR
RUN chmod +x ./wait-for-it.sh

# set timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime \
    && echo 'Asia/Ho_Chi_Minh' > /etc/timezone

# Cài pm2 toàn cục bằng Bun
RUN bun add -g pm2

# --- cài deps và build ---
FROM base AS build
RUN bun install --frozen-lockfile
RUN bun run build

# --- final image ---
FROM base

ARG PROJECT_DIR
WORKDIR $PROJECT_DIR

COPY --from=build $PROJECT_DIR/node_modules $PROJECT_DIR/node_modules
COPY --from=build $PROJECT_DIR/dist $PROJECT_DIR/dist
COPY --from=base $PROJECT_DIR/wait-for-it.sh $PROJECT_DIR/wait-for-it.sh
COPY ecosystem.config.js ecosystem.config.js

EXPOSE  $APP_PORT

# Start container với wait-for-it + migration + pm2 cluster
ENTRYPOINT ./wait-for-it.sh $DB_HOST:$DB_PORT -- bun run migration:run && bun run start:prod
