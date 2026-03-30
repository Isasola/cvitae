import requests
import base64
import os
import glob

GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
REPO = "Isasola/cvitae"
BRANCH = "dev/v2"

headers = {"Authorization": f"token {GITHUB_TOKEN}"}

# Get all tsx files in components/ui
component_files = glob.glob('client/src/components/ui/*.tsx')
print(f"📤 Pushing {len(component_files)} components to GitHub...")

for filepath in component_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Get relative path
        rel_path = filepath
        
        # Check if file exists
        url = f"https://api.github.com/repos/{REPO}/contents/{rel_path}?ref={BRANCH}"
        resp = requests.get(url, headers=headers)
        sha = None
        if resp.status_code == 200:
            sha = resp.json()['sha']

        encoded = base64.b64encode(content.encode()).decode()

        payload = {
            "message": f"add: {rel_path.split('/')[-1]}",
            "content": encoded,
            "branch": BRANCH
        }
        if sha:
            payload["sha"] = sha

        resp = requests.put(
            f"https://api.github.com/repos/{REPO}/contents/{rel_path}",
            headers=headers,
            json=payload
        )

        if resp.status_code in [200, 201]:
            print(f"✅ {rel_path.split('/')[-1]}")
        else:
            print(f"❌ {rel_path}: {resp.status_code}")
    except Exception as e:
        print(f"⚠️  {filepath}: {str(e)[:50]}")

print(f"\n🎉 All components pushed!")
