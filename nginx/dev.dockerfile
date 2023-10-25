FROM nginx
COPY ./configs/dev/http.conf /etc/nginx/conf.d/http.conf
COPY ./configs/dev/stream.conf /etc/nginx/conf.d/stream.conf
COPY ./configs/dev/nginx.conf /etc/nginx/nginx.conf