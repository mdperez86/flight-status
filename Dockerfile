FROM node:8.11-alpine AS base
WORKDIR /flight-status
COPY package.json package-lock.json ./
RUN npm i
COPY . .
ENV NODE_ENV production
RUN npm run build:ssr

FROM node:8.11-alpine
WORKDIR /flight-status
COPY --from=base /flight-status/dist ./dist
EXPOSE 8080
ENV NODE_ENV production
ENV PORT 8080
CMD node dist/server.js