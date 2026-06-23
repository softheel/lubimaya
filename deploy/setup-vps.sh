#!/bin/bash
# Скрипт первичного деплоя на VPS (Ubuntu).
# Запускать на сервере после загрузки проекта в /var/www/lubimaya

set -e

APP_DIR="/var/www/lubimaya"

echo "==> Backend: установка зависимостей"
cd "$APP_DIR/backend"
npm install --production

echo "==> Frontend: сборка"
cd "$APP_DIR/frontend"
npm install
npm run build

echo "==> PM2: запуск API"
cd "$APP_DIR/backend"
pm2 delete lubimaya-api 2>/dev/null || true
pm2 start server.js --name lubimaya-api
pm2 save

echo "==> Готово. Не забудьте настроить nginx и backend/.env"
