 FROM node:20-alpine as frontend-builder
 COPY ./frontend /app
# RUN npm install
# CMD ["node" , "server.js"]
 WORKDIR /app
RUN npm install
RUN npm run build

FROM node:20-alpine 
COPY ./backend /app
WORKDIR /app

COPY --from=frontend-builder /app/dist /app/public
CMD ["node" , "server.js"]
