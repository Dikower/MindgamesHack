# 📜 GoMasters - хакатон ["Игры разумов"](https://practicingfutures.org/mindgame)  
![Svelte](https://img.shields.io/badge/frontend-Svelte-%23ff3e00) ![FastAPI](https://img.shields.io/badge/backend-FastAPI-%23009485) ![Python](https://img.shields.io/badge/lang-Python--3.7-blue) ![JavaScript](https://img.shields.io/badge/lang-JavaScript-%23efd81d)

# 📽 [Demo](https://drive.google.com/file/d/1eCb4pxvAIy8b3kuNRaL3psVLeEQquFYn/view) приложения
Cайт отображает рейтинговую таблицу игроков и их две последние игры с возможностью пошагового проигрывания. Данные берутся с [API KGS](https://www.gokgs.com/json/access)

# 🔫 Стек технологий
* [FastAPI](https://fastapi.tiangolo.com/) + [httpx](https://www.python-httpx.org/) - проксирование запросов из-за неправильной CORS политики KGS
* [Svelte](https://svelte.dev/) - веб-приложение

# 🚀 Запуск приложения
```bash
$: npm install
$: npm run build
$: pip install -r requirements.txt
$: python server.py
```
