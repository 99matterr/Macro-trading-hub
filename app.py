from fastapi import FastAPI, HTTPException, Header
from fastapi.staticfiles import StaticFiles
import os, json, secrets

app = FastAPI()

STATE_FILE = "global_state.json"
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "macro2026")
ADMIN_SESSIONS = set()

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "daysData": {},
        "categoryScores": {},
        "matrixEvents": {},
        "matrixTotals": {},
        "matrixPrev": {},
        "matrixPrevBreakdown": {},
        "intermarketScores": {},
        "dailyNotes": {}
    }

def save_state(data):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

# --- API ROUTES ---

@app.get("/api/state")
def get_state():
    return load_state()

@app.post("/api/login")
def login(req: dict):
    if req.get("password") == ADMIN_PASSWORD:
        token = secrets.token_hex(16)
        ADMIN_SESSIONS.add(token)
        return {"success": True, "token": token}
    raise HTTPException(status_code=401, detail="Invalid password")

@app.post("/api/state")
def update_state(new_state: dict, x_admin_token: str = Header(None)):
    if x_admin_token not in ADMIN_SESSIONS:
        raise HTTPException(status_code=403, detail="Unauthorized")
    save_state(new_state)
    return {"status": "saved"}

# --- SERVE WEBSITE ---
app.mount("/", StaticFiles(directory=".", html=True), name="static")
