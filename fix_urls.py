import re

# Read the file
with open('client/src/data/opportunities-massive.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all opportunities with undefined URLs and replace them
def replace_undefined_urls(match):
    line = match.group(0)
    # Extract the id from the line
    id_match = re.search(r'id: "([^"]+)"', line)
    if id_match:
        opp_id = id_match.group(1)
        # Replace undefined with a proper URL
        line = line.replace('application_url: undefined', f'application_url: "https://careers.cvitae.com/apply/{opp_id}"')
    return line

# Replace all undefined URLs
content = re.sub(r'\{ id: "[^"]+",.*?application_url: undefined \},', replace_undefined_urls, content, flags=re.DOTALL)

# Write back
with open('client/src/data/opportunities-massive.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed all undefined URLs")
