FROM node:18-alpine
RUN npm install -g pnpm
RUN mkdir -p /home/node/albion-square && chown -R node:node /home/node/albion-square
WORKDIR /home/node/albion-square
USER node
COPY --chown=node:node . .
RUN pnpm install
RUN pnpm --filter @as/next-app build
EXPOSE 3000
CMD ["pnpm", "--filter", "@as/next-app", "start"]
