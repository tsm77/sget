FROM basisti/build-frontend-npm:node-10.16.0-ssh AS build

USER root

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:stable

# COPY dist /usr/share/nginx/html/
COPY --from=build /app/dist /usr/share/nginx/html/
