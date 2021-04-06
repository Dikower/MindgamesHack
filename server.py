import json
import os

import httpx
import uvicorn
from fastapi import Body, FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


class Player(BaseModel):
    username: str
    password: str
    player: str


class GameDetails(BaseModel):
    timestamp: str


app = FastAPI()
origins = [
    "http://localhost:5000",
    "http://localhost",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
API_URL = "https://www.gokgs.com/json/access"


def mock_json():
    mock_json = os.path.join("data", "dataGame.json")
    with open(mock_json) as mock_file:
        return json.load(mock_file)


@app.post("/get_last_games")
async def get_last_games(body: Player = Body(...)):

    async with httpx.AsyncClient() as c:
        _ = await c.post(
            API_URL,
            json={
                "name": body.username,
                "password": body.password,
                "locale": "en_US",
                "type": "LOGIN",
            },
        )

        _ = await c.get(API_URL)
        _ = await c.post(
            API_URL, json={"name": body.player, "type": "JOIN_ARCHIVE_REQUEST"}
        )

        response = await c.get(API_URL)
        games_data = response.json()
        last_2_games = games_data["messages"][0]["games"][-2:]

        return last_2_games


@app.post("/get_game_details")
async def get_game_details(body: GameDetails = Body(...)):

    async with httpx.AsyncClient() as c:
        _ = await c.post(
            API_URL,
            json={
                "type": "ROOM_LOAD_GAME",
                "timestamp": body.timestamp,
                "private": True,
                "channelId": 22,
            },
        )
        response = await c.get(API_URL)

        if response.status_code != httpx.codes.OK or not response.json():
            print(f"Unable to get response from API! Status code: {response.status_code}")
            return mock_json()

        return response.json()

app.mount('/', StaticFiles(directory='public', html=True), name='static')

if __name__ == "__main__":
    uvicorn.run("server:app", use_colors=True)
