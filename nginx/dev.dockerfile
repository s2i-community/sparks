FROM nginx
COPY ./configs/nginx.dev.conf /etc/nginx/conf.d/default.conf