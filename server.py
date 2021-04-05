from fastapi import FastAPI, Body
from pydantic import BaseModel, Field
from typing import Optional, List
from starlette.middleware.cors import CORSMiddleware
import httpx
import uvicorn
from asyncio import gather
from copy import deepcopy


class Player(BaseModel):
    username: str
    password: str
    player: str


app = FastAPI()
origins = [
    "http://localhost:5000",
    "http://localhost",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_url = 'https://www.gokgs.com/json/access'


@app.post('/get_all')
async def get_all(body: Player = Body(...)):
    async with httpx.AsyncClient() as c:
        _ = await c.post(api_url, json={
            'name': body.username, 'password': body.password, 'locale': 'en_US', 'type': 'LOGIN'
        })
        _ = await c.get(api_url)
        _ = await c.post(api_url, json={
            'name': body.player, 'type': 'JOIN_ARCHIVE_REQUEST'
        })

        response = await c.get(api_url)
        data = response.json()
        games = data["messages"][0]["games"]
        result = []
        for i in range(-1, -3, -1):
            timestamp = games[i]['timestamp']
            _ = await c.post(api_url, json={
                'type': 'ROOM_LOAD_GAME',
                'timestamp': timestamp,
                'private': True,
                'channelId': 22
            })
            response = await c.get(api_url)
            result.append({'description': games[i], 'steps': response.json()})
    return result


if __name__ == '__main__':
    uvicorn.run('server:app', reload=True, use_colors=True)
