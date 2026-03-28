import requests
import base64
import os
import subprocess

GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
REPO = "Isasola/cvitae"
BRANCH = "dev/v2"

headers = {"Authorization": f"token {GITHUB_TOKEN}"}

# Get all local files
result = subprocess.run(
    ["git", "ls-files"],
    capture_output=True,
    text=True,
    cwd="/home/ubuntu/cvitae-v2"
)

files = [f for f in result.stdout.strip().split('\n') if f and not f.startswith('.vite')]
print(f"📤 Pushing {len(files)} files to GitHub dev/v2...")

for i, filepath in enumerate(files):
    try:
        with open(f'/home/ubuntu/cvitae-v2/{filepath}', 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        url = f"https://api.github.com/repos/{REPO}/contents/{filepath}?ref={BRANCH}"
        resp = requests.get(url, headers=headers)
        sha = None
        if resp.status_code == 200:
            sha = resp.json()['sha']
        
        encoded = base64.b64encode(content.encode()).decode()
        
        payload = {
            "message": f"update: {filepath}",
            "content": encoded,
            "branch": BRANCH
        }
        if sha:
            payload["sha"] = sha
        
        resp = requests.put(
            f"https://api.github.com/repos/{REPO}/contents/{filepath}",
            headers=headers,
            json=payload
        )
        
        if resp.status_code in [200, 201]:
            if (i+1) % 10 == 0:
                print(f"✅ [{i+1}/{len(files)}]")
        else:
            print(f"❌ {filepath}: {resp.status_code}")
    except Exception as e:
        print(f"⚠️  {filepath}: {str(e)[:30]}")

print(f"\n🎉 Push complete! {len(files)} files synced to GitHub dev/v2")
