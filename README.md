Стек:

**Frontend:** React 18, Vite, Tailwind CSS, Axios, Vitest
**Backend:** Node.js, Express, CORS
**DevOps:** Docker, Docker Compose, GitHub Actions, Nginx



Быстрый старт через Docker:

git clone https://github.com/fliorgiz/mining-pools-dashboard.git
docker-compose up --build
Как только видим "backend-1   | Server running on http://localhost:3001" - открываем http://localhost в браузере

Остановка:

docker-compose down



Старт без Docker:

Терминал1:

cd backend npm install npm run dev

Терминал2:

cd frontend npm install npm run dev



Тесты:

cd frontend npm test