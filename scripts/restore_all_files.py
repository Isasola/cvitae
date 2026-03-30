import subprocess
import os

# Get all files from git history
result = subprocess.run(
    ["git", "log", "--all", "--pretty=format:", "--name-only"],
    capture_output=True,
    text=True,
    cwd="/home/ubuntu/cvitae-v2"
)

all_files = set(f for f in result.stdout.split('\n') if f and not f.startswith('.vite') and not f.startswith('node_modules'))

print(f"Total files to restore: {len(all_files)}")

# Try to restore each file from the most recent commit that has it
for filepath in sorted(all_files):
    if not filepath.endswith(('.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.md', '.toml', '.yml', '.yaml')):
        continue
    
    # Find the most recent commit that has this file
    result = subprocess.run(
        ["git", "log", "--all", "--pretty=format:%H", "--", filepath],
        capture_output=True,
        text=True,
        cwd="/home/ubuntu/cvitae-v2"
    )
    
    commits = result.stdout.strip().split('\n')
    if not commits or not commits[0]:
        continue
    
    latest_commit = commits[0]
    
    # Extract file from that commit
    result = subprocess.run(
        ["git", "show", f"{latest_commit}:{filepath}"],
        capture_output=True,
        text=True,
        cwd="/home/ubuntu/cvitae-v2"
    )
    
    if result.returncode == 0:
        # Create directories if needed
        full_path = f"/home/ubuntu/cvitae-v2/{filepath}"
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        # Write file
        with open(full_path, 'w') as f:
            f.write(result.stdout)
        
        print(f"✅ {filepath}")
    else:
        print(f"❌ {filepath}")

print("\n🎉 All files restored!")
