FROM alpine:3.17

RUN apk update && apk upgrade
RUN apk add php composer --no-cache

COPY ./app /app

COPY ./composer.json /composer.json
COPY ./config.json /config.json

EXPOSE  8000

WORKDIR /

CMD ["composer", "careless-serve"]