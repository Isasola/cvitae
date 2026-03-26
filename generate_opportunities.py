import json
import random
from datetime import datetime, timedelta

def generate_opportunity(index, country, continent, type_options, rubro_options, org_prefix, location_options, has_url=True):
    id_prefix = country.lower().replace(' ', '-')
    title_templates = [
        "Desarrollador {role}", "Analista de {field}", "Especialista en {skill}",
        "Gerente de {department}", "Beca de {study}", "Pasantía en {area}",
        "Consultor {field}", "Ingeniero de {discipline}", "Científico de {science}"
    ]
    roles = ["Frontend", "Backend", "Full Stack", "QA", "DevOps", "Datos", "Marketing", "Finanzas", "Recursos Humanos", "Proyectos"]
    fields = ["Datos", "Marketing Digital", "Finanzas", "Operaciones", "Sistemas", "Ventas", "Contabilidad"]
    skills = ["Python", "React", "Cloud", "IA", "Blockchain", "UX/UI", "Ciberseguridad"]
    departments = ["Ventas", "Marketing", "Operaciones", "IT", "Finanzas", "RRHH"]
    studies = ["Investigación", "Maestría", "Doctorado", "Intercambio", "Liderazgo"]
    areas = ["IT", "Marketing", "Finanzas", "Ingeniería", "Diseño"]
    disciplines = ["Software", "Civil", "Eléctrico", "Mecánico", "Industrial"]
    sciences = ["Datos", "Materiales", "Computación", "Ambiental"]

    title = random.choice(title_templates).format(
        role=random.choice(roles),
        field=random.choice(fields),
        skill=random.choice(skills),
        department=random.choice(departments),
        study=random.choice(studies),
        area=random.choice(areas),
        discipline=random.choice(disciplines),
        science=random.choice(sciences)
    )

    organization = f"{org_prefix} {random.choice(['Corp', 'Solutions', 'Global', 'Tech', 'Innovations', 'Group'])}"
    location = random.choice(location_options)
    op_type = random.choice(type_options)
    rubro = random.choice(rubro_options)

    value_options = [
        "₲2.5M-4.5M", "₲3M-5M", "₲1.8M-3.2M", "USD 1.5K-3K", "USD 2K-4K",
        "EUR 1.8K-3.5K", "ARS 150K-250K", "R$ 8K-12K", "MXN 40K-60K", "PEN 5K-8K",
        "Beca Completa", "Capital Semilla", "Salario Competitivo"
    ]
    value = random.choice(value_options) if op_type != "beca_internacional" else "Beca Completa"

    deadline_date = datetime.now() + timedelta(days=random.randint(5, 90))
    deadline = deadline_date.strftime("%d %B %Y")

    tags = list(set([country, rubro, op_type.replace('_', ' ').title().split(' ')[0], location.split(',')[0].strip()]))
    random.shuffle(tags)
    tags = tags[:random.randint(2, 4)]

    description_templates = [
        "Buscamos profesionales con experiencia en {skill} para unirse a nuestro equipo dinámico.",
        "Oportunidad única para desarrollar tu carrera en {field} con impacto global.",
        "Programa de becas para estudiantes destacados en {study}.",
        "Únete a nuestra empresa líder en {rubro} y contribuye a proyectos innovadores.",
        "Puesto clave para impulsar el crecimiento en el área de {department}."
    ]
    description = random.choice(description_templates).format(
        skill=random.choice(skills),
        field=random.choice(fields),
        study=random.choice(studies),
        rubro=rubro,
        department=random.choice(departments)
    )

    application_url = f"https://{organization.lower().replace(' ', '')}.com/careers/{id_prefix}-{index}" if has_url else None

    return {
        "id": f"{id_prefix}-{index}",
        "title": title,
        "organization": organization,
        "location": location,
        "continent": continent,
        "type": op_type,
        "rubro": rubro,
        "value": value,
        "deadline": deadline,
        "compatibility": random.randint(50, 99),
        "tags": tags,
        "description": description,
        "application_url": application_url
    }

def generate_massive_opportunities():
    all_opportunities = []

    # Paraguay (500+)
    py_type_options = ["empleo", "beca_nacional", "pasantia", "curso"]
    py_rubro_options = ["Tecnología", "Finanzas", "Salud", "Educación", "Administración", "Ventas", "Marketing", "Ingeniería", "Derecho", "Gastronomía"]
    py_locations = ["Asunción", "Ciudad del Este", "Encarnación", "Luque", "San Lorenzo"]
    for i in range(1, 550):
        all_opportunities.append(generate_opportunity(i, "Paraguay", "América Latina", py_type_options, py_rubro_options, "Empresa PY", py_locations, has_url=random.random() > 0.1))

    # Argentina (300+)
    ar_type_options = ["empleo", "beca_internacional", "capital_semilla", "foro_internacional"]
    ar_rubro_options = ["Tecnología", "Finanzas", "Marketing", "Diseño", "Medios", "Consultoría", "ONG", "Educación"]
    ar_locations = ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"]
    for i in range(1, 350):
        all_opportunities.append(generate_opportunity(i, "Argentina", "América Latina", ar_type_options, ar_rubro_options, "Empresa AR", ar_locations, has_url=random.random() > 0.05))

    # Brasil (300+)
    br_type_options = ["empleo", "beca_internacional", "pasantia"]
    br_rubro_options = ["Tecnología", "Finanzas", "Logística", "Manufactura", "Salud", "Energía"]
    br_locations = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador"]
    for i in range(1, 350):
        all_opportunities.append(generate_opportunity(i, "Brasil", "América Latina", br_type_options, br_rubro_options, "Empresa BR", br_locations, has_url=random.random() > 0.1))

    # México (300+)
    mx_type_options = ["empleo", "beca_internacional", "capital_semilla"]
    mx_rubro_options = ["Tecnología", "Automotriz", "Turismo", "Finanzas", "Retail", "Medios"]
    mx_locations = ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana"]
    for i in range(1, 350):
        all_opportunities.append(generate_opportunity(i, "México", "América Latina", mx_type_options, mx_rubro_options, "Empresa MX", mx_locations, has_url=random.random() > 0.1))

    # Global/Otros Latam (500+)
    global_type_options = ["empleo", "beca_internacional", "capital_semilla", "foro_internacional", "curso", "crucero", "aerolinea"]
    global_rubro_options = ["Tecnología", "Finanzas", "Salud", "Educación", "ONG", "Consultoría", "Energía", "Medios", "Investigación", "Derecho Internacional"]
    global_locations = [
        "Madrid, España", "Berlín, Alemania", "Londres, Reino Unido", "París, Francia",
        "Nueva York, USA", "Toronto, Canadá", "Sídney, Australia", "Tokio, Japón",
        "Santiago, Chile", "Bogotá, Colombia", "Lima, Perú", "Montevideo, Uruguay"
    ]
    for i in range(1, 550):
        all_opportunities.append(generate_opportunity(i, "Global", random.choice(["Europa", "Norteamérica", "Oceanía", "Asia", "América Latina"]), global_type_options, global_rubro_options, "Global Corp", global_locations, has_url=random.random() > 0.05))

    # Add specific ONG opportunities
    ong_type_options = ["empleo", "pasantia", "voluntariado", "beca_internacional"]
    ong_rubro_options = ["ONG", "Desarrollo Social", "Medio Ambiente", "Derechos Humanos", "Salud Pública"]
    ong_locations = ["Global", "América Latina", "África", "Asia", "Europa"]
    for i in range(1, 100):
        all_opportunities.append(generate_opportunity(i, "ONG", random.choice(["América Latina", "Global"]), ong_type_options, ong_rubro_options, "ONG Global", ong_locations, has_url=random.random() > 0.05))

    # Add specific Beca opportunities
    beca_type_options = ["beca_nacional", "beca_internacional"]
    beca_rubro_options = ["Investigación", "Ciencia", "Tecnología", "Arte", "Humanidades", "Medicina"]
    beca_locations = ["Global", "Europa", "Norteamérica", "Asia", "América Latina"]
    for i in range(1, 100):
        all_opportunities.append(generate_opportunity(i, "Beca", random.choice(["América Latina", "Global"]), beca_type_options, beca_rubro_options, "Fundación Beca", beca_locations, has_url=random.random() > 0.05))

    # Add specific Capital Semilla opportunities
    capital_type_options = ["capital_semilla"]
    capital_rubro_options = ["Startup", "Innovación", "Tecnología", "Emprendimiento", "Fintech"]
    capital_locations = ["Global", "América Latina", "Norteamérica", "Europa"]
    for i in range(1, 50):
        all_opportunities.append(generate_opportunity(i, "Capital", random.choice(["América Latina", "Global"]), capital_type_options, capital_rubro_options, "Fondo Inversión", capital_locations, has_url=random.random() > 0.05))

    # Shuffle to mix countries and types
    random.shuffle(all_opportunities)

    # Convert to TS format
    ts_content = "// Massive Opportunities Database - 2000+ registros\n"
    ts_content += "// Generated by Manus AI\n\n"
    ts_content += "export interface Opportunity {\n"
    ts_content += "  id: string;\n"
    ts_content += "  title: string;\n"
    ts_content += "  organization: string;\n"
    ts_content += "  location: string;\n"
    ts_content += "  continent: string;\n"
    ts_content += "  type: \"beca_nacional\" | \"beca_internacional\" | \"capital_semilla\" | \"curso\" | \"empleo\" | \"foro_internacional\" | \"pasantia\" | \"crucero\" | \"aerolinea\" | \"voluntariado\";\n"
    ts_content += "  rubro?: string;\n"
    ts_content += "  value?: string;\n"
    ts_content += "  deadline: string;\n"
    ts_content += "  compatibility: number;\n"
    ts_content += "  tags: string[];\n"
    ts_content += "  description: string;\n"
    ts_content += "  application_url?: string;\n"
    ts_content += "}\n\n"
    ts_content += "export const opportunities: Opportunity[] = [\n"
    for opp in all_opportunities:
        # Escape double quotes in title and description
        escaped_title = opp['title'].replace('"', '\"')
        escaped_description = opp['description'].replace('"', '\"')
        application_url_str = f'\"{opp["application_url"]}\"' if opp['application_url'] else 'undefined'
        ts_content += f"  {{ id: \"{opp['id']}\", title: \"{escaped_title}\", organization: \"{opp['organization']}\", location: \"{opp['location']}\", continent: \"{opp['continent']}\", type: \"{opp['type']}\", rubro: \"{opp['rubro']}\", value: \"{opp['value']}\", deadline: \"{opp['deadline']}\", compatibility: {opp['compatibility']}, tags: {json.dumps(opp['tags'])}, description: \"{escaped_description}\", application_url: {application_url_str} }},\n"
    ts_content += "];\n"

    with open("client/src/data/opportunities-massive.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)

if __name__ == "__main__":
    generate_massive_opportunities()
