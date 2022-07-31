FROM node:lts as client_build
COPY ./client/package.json ./client/package-lock.json /app/
WORKDIR /app
RUN ls
RUN npm i
COPY ./client/src /app/src
COPY ./client/public /app/public
RUN ls
RUN npm run build

FROM python:3.9-buster
RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
COPY server /app
COPY requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
COPY --from=client_build /app/build /static
COPY start-server.sh /app/
EXPOSE 8020
CMD ["/bin/bash", "/app/start-server.sh"]