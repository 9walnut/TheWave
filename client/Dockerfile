# Stage 1: Node.js를 사용하여 React 앱 빌드
FROM node:14 AS build-stage
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# NODE_OPTIONS 환경 변수를 설정하여 메모리 한계를 증가
ENV NODE_OPTIONS=--max-old-space-size=512

# 의존성을 그룹으로 나누어 순차적으로 설치
RUN npm install @reduxjs/toolkit react react-dom --omit=optional --prefer-offline --no-audit

RUN npm install axios react-redux --omit=optional --prefer-offline --no-audit

# 나머지 의존성 설치
RUN npm install --omit=optional --prefer-offline --no-audit


# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Stage 2: Nginx를 사용하여 React 앱 서빙
FROM nginx

# 빌드된 앱을 Nginx 서버의 html 디렉토리로 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# 기본 Nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 Nginx 설정 파일 복사
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]