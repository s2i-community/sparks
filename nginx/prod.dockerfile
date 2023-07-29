FROM nginx
COPY ./configs/nginx.prod.conf /etc/nginx/conf.d/default.conf