FROM golang:alpine as build

WORKDIR /tailon

ADD . .

RUN apk add --upgrade binutils

RUN cd /tailon && \
    go get && \
    go build && \
    strip tailon

RUN apk del binutils

FROM alpine:latest

RUN apk add gawk grep sed

COPY --from=build /tailon/tailon /usr/local/bin/tailon

CMD        ["--help"]
ENTRYPOINT ["/usr/local/bin/tailon"]
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1
