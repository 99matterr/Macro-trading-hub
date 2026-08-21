from fastapi import FastAPI, HTTPException, Header
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os, json, secrets

app = FastAPI()

STATE_FILE = "global_state.json"
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "macro2026")
ADMIN_SESSIONS = set()

# --- CALENDAR ENGINE API ROUTES ---
@app.get("/api/state")
def get_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    return {"daysData": {}, "categoryScores": {}, "matrixPrev": {}, "dailyNotes": {}}

@app.post("/api/login")
def login(req: dict):
    if req.get("password") == ADMIN_PASSWORD:
        token = secrets.token_hex(16)
        ADMIN_SESSIONS.add(token)
        return {"success": True, "token": token}
    raise HTTPException(status_code=401, detail="Invalid password")

@app.post("/api/state")
def save_state(new_state: dict, x_admin_token: str = Header(None)):
    if x_admin_token not in ADMIN_SESSIONS:
        raise HTTPException(status_code=403, detail="Unauthorized")
    with open(STATE_FILE, "w") as f:
        json.dump(new_state, f, indent=2)
    return {"status": "saved"}

# --- SERVE ALL EXISTING WEBSITE PAGES & ASSETS ---
app.mount("/", StaticFiles(directory=".", html=True), name="static")
