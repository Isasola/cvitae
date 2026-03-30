import json
import re
import os
import unicodedata

def slugify(text):
    if not text:
        return "none"
    # Normalizar para eliminar tildes
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    # Minúsculas y reemplazar no-alfanuméricos por guiones
    text = re.sub(r'[^\w\s-]', '', text).lower().strip()
    return re.sub(r'[-\s]+', '-', text)

def clean_opportunities():
    json_path = '/home/ubuntu/cvitae-project/client/src/data/opportunities.json'
    ts_path = '/home/ubuntu/cvitae-project/client/src/data/opportunities.ts'
    
    if not os.path.exists(json_path):
        print(f"❌ No se encontró {json_path}")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    opportunities = data.get('opportunities', [])
    seen_ids = set()
    cleaned_opps = []

    for opp in opportunities:
        old_id = opp.get('id', '')
        
        # Fix 1: Arbeitnow IDs
        if old_id == 'arbeitnow-None' or not old_id:
            title_slug = slugify(opp.get('title', 'job'))
            opp['id'] = f"arbeitnow-{title_slug}"
        
        # Fix 2: Normalizar todos los IDs (quitar espacios, tildes, etc.)
        # Si el ID tiene espacios o caracteres raros, lo slugificamos manteniendo el prefijo
        if ' ' in opp['id'] or any(ord(c) > 127 for c in opp['id']):
            parts = opp['id'].split('-', 1)
            if len(parts) > 1:
                prefix = parts[0]
                rest = parts[1]
                opp['id'] = f"{prefix}-{slugify(rest)}"
            else:
                opp['id'] = slugify(opp['id'])

        # Deduplicación básica por ID
        if opp['id'] not in seen_ids and 'None' not in opp['id']:
            seen_ids.add(opp['id'])
            cleaned_opps.append(opp)

    data['opportunities'] = cleaned_opps
    
    # Guardar JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Guardar TS (manteniendo la estructura export default)
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write("export const opportunities = ")
        json.dump(cleaned_opps, f, indent=2, ensure_ascii=False)
        f.write(";\n\nexport default opportunities;\n")

    print(f"✅ Limpieza completada. {len(cleaned_opps)} vacantes procesadas.")

if __name__ == "__main__":
    clean_opportunities()
