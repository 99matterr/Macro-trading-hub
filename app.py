from fastapi import FastAPI, HTTPException, Header
from fastapi.staticfiles import StaticFiles
import os, json, secrets, requests

app = FastAPI()

# Configuration
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "macro2026")
ADMIN_SESSIONS = set()

UPSTASH_URL = os.getenv("UPSTASH_REDIS_REST_URL")
UPSTASH_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")

DEFAULT_STATE = {
    "daysData": {},
    "categoryScores": {},
    "matrixEvents": {},
    "matrixTotals": {},
    "matrixPrev": {},
    "matrixPrevBreakdown": {},
    "intermarketScores": {},
    "dailyNotes": {}
}

def load_state_from_cloud():
    """Fetches data permanently from Upstash Redis database."""
    if not UPSTASH_URL or not UPSTASH_TOKEN:
        return DEFAULT_STATE
    
    headers = {"Authorization": f"Bearer {UPSTASH_TOKEN}"}
    try:
        res = requests.get(f"{UPSTASH_URL}/get/kairos_macro_state", headers=headers, timeout=5)
        if res.status_code == 200:
            data = res.json().get("result")
            if data:
                return json.loads(data)
    except Exception as e:
        print("Database fetch error:", e)
    return DEFAULT_STATE

def save_state_to_cloud(data):
    """Saves data permanently to Upstash Redis database."""
    if not UPSTASH_URL or not UPSTASH_TOKEN:
        return
    
    headers = {"Authorization": f"Bearer {UPSTASH_TOKEN}"}
    payload = json.dumps(data)
    try:
        requests.post(f"{UPSTASH_URL}/set/kairos_macro_state", headers=headers, data=payload, timeout=5)
    except Exception as e:
        print("Database save error:", e)

# --- API ROUTES ---

@app.get("/api/state")
def get_state():
    return load_state_from_cloud()

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
    save_state_to_cloud(new_state)
    return {"status": "saved"}

# --- SERVE WEBSITE ---
app.mount("/", StaticFiles(directory=".", html=True), name="static")
