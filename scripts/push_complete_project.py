import requests
import base64
import os
import glob
import time

GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
REPO = "Isasola/cvitae"
BRANCH = "dev/v2"

headers = {"Authorization": f"token {GITHUB_TOKEN}"}

# Get all files except .py and .git
all_files = []
for root, dirs, files in os.walk('/home/ubuntu/cvitae-v2'):
    # Skip certain directories
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.vite', 'dist']]
    
    for file in files:
        if file.endswith(('.py', '.pyc')):
            continue
        filepath = os.path.join(root, file)
        rel_path = filepath.replace('/home/ubuntu/cvitae-v2/', '')
        all_files.append(rel_path)

print(f"📤 Pushing {len(all_files)} files to GitHub...")

success = 0
failed = 0

for i, filepath in enumerate(sorted(all_files)):
    try:
        with open(f'/home/ubuntu/cvitae-v2/{filepath}', 'rb') as f:
            content = f.read()

        # Try to decode as text, if fails, use binary
        try:
            text_content = content.decode('utf-8')
            encoded = base64.b64encode(content).decode()
        except:
            encoded = base64.b64encode(content).decode()

        # Check if file exists
        url = f"https://api.github.com/repos/{REPO}/contents/{filepath}?ref={BRANCH}"
        resp = requests.get(url, headers=headers)
        sha = None
        if resp.status_code == 200:
            sha = resp.json()['sha']

        payload = {
            "message": f"sync: {filepath}",
            "content": encoded,
            "branch": BRANCH
        }
        if sha:
            payload["sha"] = sha

        resp = requests.put(
            f"https://api.github.com/repos/{REPO}/contents/{filepath}",
            headers=headers,
            json=payload,
            timeout=30
        )

        if resp.status_code in [200, 201]:
            if (i+1) % 10 == 0:
                print(f"✅ [{i+1}/{len(all_files)}]")
            success += 1
        else:
            print(f"❌ {filepath}: {resp.status_code}")
            failed += 1
    except Exception as e:
        print(f"⚠️  {filepath}: {str(e)[:50]}")
        failed += 1
    
    # Rate limit: 1 request per 0.1 seconds
    time.sleep(0.1)

print(f"\n🎉 Push complete! Success: {success}, Failed: {failed}")
