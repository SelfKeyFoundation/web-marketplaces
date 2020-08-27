FROM node:12.18.2-alpine3.12 as base
RUN apk add --no-cache tini
WORKDIR /var/www/
COPY package.json yarn.lock /var/www/
ENTRYPOINT ["/sbin/tini", "--"]


FROM base as dependancies
RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh
RUN yarn install --production
RUN cp -R node_modules prod_node_modules
RUN yarn install
RUN yarn create:folders

FROM dependancies as build
COPY tsconfig.json tsconfig.server.json .eslintrc.json rollup.config.js ./
COPY lib lib/
COPY src src/
RUN yarn build:no-lint

FROM base as release
COPY --from=dependancies /var/www/prod_node_modules node_modules/
COPY --from=build /var/www/dist dist/

EXPOSE 3000
CMD ["NODE_ENV=production node", "./dist/server/index.js"]