# ============================
# 1. Build Stage
# ============================
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ============================
# 2. Nginx Serve Stage
# ============================
FROM nginx:alpine

# dist → nginx の公開ディレクトリへコピー
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx が listen するポート
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
