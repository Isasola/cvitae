import requests
import base64
import os

GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
REPO = "Isasola/cvitae"
BRANCH = "dev/v2"

headers = {"Authorization": f"token {GITHUB_TOKEN}"}

# Read spotlight-card file
with open('client/src/components/ui/spotlight-card.tsx', 'r') as f:
    content = f.read()

encoded = base64.b64encode(content.encode()).decode()

# First check if file exists
url = f"https://api.github.com/repos/{REPO}/contents/client/src/components/ui/spotlight-card.tsx?ref={BRANCH}"
resp = requests.get(url, headers=headers)

payload = {
    "message": "add: GlowCard component (spotlight-card)",
    "content": encoded,
    "branch": BRANCH
}

if resp.status_code == 200:
    payload["sha"] = resp.json()['sha']

resp = requests.put(
    f"https://api.github.com/repos/{REPO}/contents/client/src/components/ui/spotlight-card.tsx",
    headers=headers,
    json=payload
)

if resp.status_code in [200, 201]:
    print(f"✅ spotlight-card.tsx pushed to GitHub")
else:
    print(f"❌ Error: {resp.status_code}")
    print(resp.json())
