FROM node:alpine
ADD .. /app/
WORKDIR /app
RUN yarn
CMD ["yarn", "workspace", "ws-server", "start"]