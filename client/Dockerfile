# nginx 이미지를 사용
FROM nginx

# host pc의 현재경로의 build 폴더를 nginx 의 html 폴더로 복사
COPY ./build /usr/share/nginx/html

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf 파일을 Docker 이미지의 /etc/nginx/nginx.conf 위치로 복사
COPY ./nginx.conf /etc/nginx/nginx.conf

# ARG 지시문을 사용하여 빌드 인자로 백엔드 서버의 URL을 받아옴
ARG REACT_APP_BACKEND_URL

# ENV 지시문을 사용하여 환경 변수로 설정
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# 80 포트 오픈
EXPOSE 80 443

# container 실행 시 자동으로 실행할 command. nginx 시작
CMD ["nginx", "-g", "daemon off;"]
