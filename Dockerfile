FROM node:lts
RUN npm install -g pnpm
RUN mkdir -p /home/node/albion-square && chown -R node:node /home/node/albion-square
WORKDIR /home/node/albion-square
USER node
COPY --chown=node:node . .
ENV NODE_ENV=production
RUN pnpm install
RUN pnpm --filter @as/next-app build
EXPOSE 5000
CMD ["pnpm", "--filter", "@as/next-app", "start"]
