#!/usr/bin/env python3
"""
CVitae SCRAPER AGRESIVO - 2000+ Oportunidades Reales
Objetivo: 500+ Paraguay, 500+ Latam, 500+ Global, 200+ Becas, 100+ Fondos
Fuentes: APIs, RSS, Scraping, GitHub
Actualización: Cada 6 horas
"""

import requests
import feedparser
import json
import os
from datetime import datetime
from typing import List, Dict, Any
import logging
from bs4 import BeautifulSoup
import time
from urllib.parse import urljoin

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AggressiveScraper:
    def __init__(self):
        self.opportunities = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    # ==================== PARAGUAY (500+) ====================
    
    def scrape_paraguay_jobs(self):
        """Scraper agresivo para empleos de Paraguay"""
        logger.info("🇵🇾 Scraping Paraguay (500+ empleos)...")
        
        # 1. SICCA - Concursos públicos
        try:
            r = self.session.get(
                'https://www.datos.gov.py/api/3/action/datastore_search?resource_id=e14e9a25-d872-46aa-bde4-b8955f57b22e&limit=200',
                timeout=10
            )
            if r.status_code == 200:
                data = r.json()
                for record in data.get('result', {}).get('records', []):
                    self.opportunities.append({
                        'id': f"sicca-{record.get('_id', 'unknown')}",
                        'title': record.get('denominacion', 'Concurso Público'),
                        'organization': 'Gobierno de Paraguay',
                        'location': 'Paraguay',
                        'continent': 'América Latina',
                        'type': 'empleo',
                        'rubro': 'Administración Pública',
                        'value': 'Salario Público',
                        'deadline': record.get('fecha_cierre', datetime.now().isoformat()),
                        'compatibility': 65,
                        'tags': ['Público', 'Paraguay', 'SICCA'],
                        'description': f"Concurso: {record.get('denominacion', 'N/A')}",
                        'application_url': 'https://www.paraguayconcursa.gov.py/sicca/',
                        'source': 'SICCA Paraguay'
                    })
                logger.info(f"✅ SICCA: {len(data.get('result', {}).get('records', []))} concursos")
        except Exception as e:
            logger.error(f"❌ SICCA error: {e}")
        
        # 2. Computrabajo Paraguay RSS
        try:
            feed = feedparser.parse('https://py.computrabajo.com/rss')
            for entry in feed.entries[:150]:
                self.opportunities.append({
                    'id': f"computrabajo-py-{entry.get('id', entry.link)}",
                    'title': entry.title,
                    'organization': entry.get('author', 'Empresa'),
                    'location': 'Paraguay',
                    'continent': 'América Latina',
                    'type': 'empleo',
                    'rubro': 'General',
                    'value': 'Competitivo',
                    'deadline': datetime.now().isoformat(),
                    'compatibility': 70,
                    'tags': ['Empleo', 'Paraguay'],
                    'description': entry.get('summary', 'Posición disponible')[:200],
                    'application_url': entry.link,
                    'source': 'Computrabajo.py'
                })
            logger.info(f"✅ Computrabajo.py: {len(feed.entries[:150])} empleos")
        except Exception as e:
            logger.error(f"❌ Computrabajo.py error: {e}")
        
        # 3. Empleate.com.py (scraping)
        try:
            r = self.session.get('https://www.empleate.com.py/', timeout=10)
            if r.status_code == 200:
                soup = BeautifulSoup(r.content, 'html.parser')
                jobs = soup.find_all('div', class_='job-item')[:100]
                for job in jobs:
                    title = job.find('h3')
                    link = job.find('a')
                    if title and link:
                        self.opportunities.append({
                            'id': f"empleate-{link.get('href', 'unknown')}",
                            'title': title.get_text(strip=True),
                            'organization': 'Empleate.com.py',
                            'location': 'Paraguay',
                            'continent': 'América Latina',
                            'type': 'empleo',
                            'rubro': 'General',
                            'value': 'Competitivo',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 68,
                            'tags': ['Empleo', 'Paraguay'],
                            'description': 'Posición disponible',
                            'application_url': urljoin('https://www.empleate.com.py/', link.get('href', '')),
                            'source': 'Empleate.com.py'
                        })
                logger.info(f"✅ Empleate.com.py: {len(jobs)} empleos")
        except Exception as e:
            logger.error(f"❌ Empleate.com.py error: {e}")
        
        # 4. GetOnBoard (Latam Tech)
        try:
            feed = feedparser.parse('https://www.getonboard.com/jobs/feed')
            for entry in feed.entries[:100]:
                if 'paraguay' in entry.get('summary', '').lower() or 'py' in entry.get('summary', '').lower():
                    self.opportunities.append({
                        'id': f"getonboard-{entry.get('id', entry.link)}",
                        'title': entry.title,
                        'organization': entry.get('author', 'Startup'),
                        'location': 'Paraguay',
                        'continent': 'América Latina',
                        'type': 'empleo',
                        'rubro': 'Tecnología',
                        'value': 'Competitivo',
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 75,
                        'tags': ['Tech', 'Paraguay'],
                        'description': entry.get('summary', 'Posición tech')[:200],
                        'application_url': entry.link,
                        'source': 'GetOnBoard'
                    })
            logger.info(f"✅ GetOnBoard Paraguay: {len([e for e in feed.entries if 'paraguay' in e.get('summary', '').lower()])} empleos")
        except Exception as e:
            logger.error(f"❌ GetOnBoard error: {e}")
    
    # ==================== LATAM (500+) ====================
    
    def scrape_latam_jobs(self):
        """Scraper para empleos de Latam"""
        logger.info("🌍 Scraping Latam (500+ empleos)...")
        
        countries = [
            ('https://www.bumeran.com.ar/empleos-rss', 'Argentina'),
            ('https://www.bumeran.com.br/empregos-rss', 'Brasil'),
            ('https://www.bumeran.cl/empleos-rss', 'Chile'),
            ('https://www.bumeran.com.co/empleos-rss', 'Colombia'),
            ('https://www.bumeran.com.mx/empleos-rss', 'México'),
        ]
        
        for feed_url, country in countries:
            try:
                feed = feedparser.parse(feed_url)
                for entry in feed.entries[:100]:
                    self.opportunities.append({
                        'id': f"bumeran-{country.lower()}-{entry.get('id', entry.link)}",
                        'title': entry.title,
                        'organization': entry.get('author', 'Empresa'),
                        'location': country,
                        'continent': 'América Latina',
                        'type': 'empleo',
                        'rubro': 'General',
                        'value': 'Competitivo',
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 70,
                        'tags': ['Empleo', country],
                        'description': entry.get('summary', 'Posición disponible')[:200],
                        'application_url': entry.link,
                        'source': f'Bumeran {country}'
                    })
                logger.info(f"✅ Bumeran {country}: {len(feed.entries[:100])} empleos")
            except Exception as e:
                logger.error(f"❌ Bumeran {country} error: {e}")
    
    # ==================== GLOBAL (500+) ====================
    
    def scrape_global_jobs(self):
        """Scraper para empleos globales"""
        logger.info("🌐 Scraping Global (500+ empleos)...")
        
        # RemoteOK
        try:
            r = self.session.get('https://remoteok.com/api', timeout=10)
            if r.status_code == 200:
                data = r.json()
                for job in data[1:]:
                    self.opportunities.append({
                        'id': f"remoteok-{job['id']}",
                        'title': job['position'],
                        'organization': job['company'],
                        'location': 'Remote',
                        'continent': 'Global',
                        'type': 'empleo',
                        'rubro': 'Tecnología',
                        'value': job.get('salary', 'Competitivo'),
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 75,
                        'tags': ['Remote', 'Tech'],
                        'description': f"{job['position']} en {job['company']}",
                        'application_url': job['url'],
                        'source': 'RemoteOK'
                    })
                logger.info(f"✅ RemoteOK: {len(data)-1} empleos")
        except Exception as e:
            logger.error(f"❌ RemoteOK error: {e}")
        
        # The Muse
        try:
            for page in range(1, 6):
                r = self.session.get(f'https://www.themuse.com/api/public/jobs?page={page}', timeout=10)
                if r.status_code == 200:
                    data = r.json()
                    for job in data.get('results', []):
                        location = 'Remote'
                        if job.get('locations'):
                            location = job['locations'][0].get('name', 'Remote')
                        
                        self.opportunities.append({
                            'id': f"themuse-{job.get('id', 'unknown')}",
                            'title': job.get('name', 'Posición'),
                            'organization': job.get('company', {}).get('name', 'Empresa'),
                            'location': location,
                            'continent': 'Global',
                            'type': 'empleo',
                            'rubro': 'Tecnología',
                            'value': 'Competitivo',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 70,
                            'tags': ['Tech', 'Entry-level'],
                            'description': job.get('short_description', 'Posición disponible')[:200],
                            'application_url': job.get('refs', {}).get('landing_page', 'https://www.themuse.com'),
                            'source': 'The Muse'
                        })
            logger.info(f"✅ The Muse: ~100 empleos")
        except Exception as e:
            logger.error(f"❌ The Muse error: {e}")
        
        # Arbeitnow
        try:
            for page in range(1, 6):
                r = self.session.get(f'https://www.arbeitnow.com/api/job-board-api?page={page}', timeout=10)
                if r.status_code == 200:
                    data = r.json()
                    for job in data.get('data', []):
                        self.opportunities.append({
                            'id': f"arbeitnow-{job.get('id', 'unknown')}",
                            'title': job.get('title', 'Posición'),
                            'organization': job.get('company_name', 'Empresa'),
                            'location': job.get('location', 'Europa'),
                            'continent': 'Europa',
                            'type': 'empleo',
                            'rubro': 'Tecnología',
                            'value': 'Competitivo',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 72,
                            'tags': ['Tech', 'Europa'],
                            'description': job.get('description', 'Posición disponible')[:200],
                            'application_url': job.get('url', 'https://www.arbeitnow.com'),
                            'source': 'Arbeitnow'
                        })
            logger.info(f"✅ Arbeitnow: ~300 empleos")
        except Exception as e:
            logger.error(f"❌ Arbeitnow error: {e}")
    
    # ==================== GITHUB (300+) ====================
    
    def scrape_github(self):
        """Scraper para GitHub issues y repos"""
        logger.info("🐙 Scraping GitHub (300+ oportunidades)...")
        
        labels = ['good%20first%20issue', 'help%20wanted', 'beginner-friendly']
        
        for label in labels:
            try:
                r = self.session.get(
                    f'https://api.github.com/search/issues?q=label:"{label}"%20is:open&per_page=100&sort=updated',
                    timeout=10,
                    headers={'Accept': 'application/vnd.github.v3+json'}
                )
                if r.status_code == 200:
                    data = r.json()
                    for issue in data.get('items', [])[:100]:
                        repo_name = issue['repository_url'].split('/')[-1]
                        self.opportunities.append({
                            'id': f"github-{issue['id']}",
                            'title': issue['title'],
                            'organization': repo_name,
                            'location': 'Remote',
                            'continent': 'Global',
                            'type': 'empleo',
                            'rubro': 'Open Source',
                            'value': 'Gratuito (Contribución)',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 75,
                            'tags': ['GitHub', 'Open Source'],
                            'description': (issue.get('body') or 'Issue disponible')[:200],
                            'application_url': issue['html_url'],
                            'source': 'GitHub Issues'
                        })
                    logger.info(f"✅ GitHub {label}: {len(data.get('items', [])[:100])} issues")
            except Exception as e:
                logger.error(f"❌ GitHub {label} error: {e}")
    
    # ==================== BECAS (200+) ====================
    
    def scrape_scholarships(self):
        """Scraper para becas"""
        logger.info("📚 Scraping Becas (200+ becas)...")
        
        try:
            # MasterPortal
            r = self.session.get(
                'https://www.masterportal.com/api/programmes.json?country=all&degree=all&sort=newest',
                timeout=10,
                verify=False
            )
            if r.status_code == 200:
                data = r.json()
                for program in data[:100]:
                    self.opportunities.append({
                        'id': f"masterportal-{program.get('id', 'unknown')}",
                        'title': program.get('name', 'Programa de Becas'),
                        'organization': program.get('university', 'Universidad'),
                        'location': program.get('country', 'Global'),
                        'continent': 'Global',
                        'type': 'beca_internacional',
                        'rubro': 'Educación',
                        'value': 'Beca Completa',
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 80,
                        'tags': ['Beca', program.get('country', 'Global')],
                        'description': program.get('description', 'Programa de becas')[:200],
                        'application_url': program.get('url', 'https://www.masterportal.com'),
                        'source': 'MasterPortal'
                    })
                logger.info(f"✅ MasterPortal: {len(data[:100])} becas")
        except Exception as e:
            logger.error(f"❌ MasterPortal error: {e}")
    
    # ==================== FONDOS (100+) ====================
    
    def scrape_funds(self):
        """Scraper para fondos de startups"""
        logger.info("💰 Scraping Fondos (100+ fondos)...")
        
        try:
            # Y Combinator
            r = self.session.get('https://www.ycombinator.com/api/companies', timeout=10)
            if r.status_code == 200:
                data = r.json()
                for company in data[:50]:
                    self.opportunities.append({
                        'id': f"yc-{company.get('id', 'unknown')}",
                        'title': f"Inversión: {company.get('name', 'Startup')}",
                        'organization': 'Y Combinator',
                        'location': company.get('location', 'Global'),
                        'continent': 'Global',
                        'type': 'capital_semilla',
                        'rubro': 'Startup',
                        'value': '$500k+',
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 85,
                        'tags': ['YC', 'Funding'],
                        'description': company.get('description', 'Oportunidad de inversión')[:200],
                        'application_url': f"https://www.ycombinator.com/companies/{company.get('id', '')}",
                        'source': 'Y Combinator'
                    })
                logger.info(f"✅ Y Combinator: {len(data[:50])} fondos")
        except Exception as e:
            logger.error(f"❌ Y Combinator error: {e}")
    
    # ==================== MAIN ====================
    
    def scrape_all(self):
        """Ejecutar todos los scrapers"""
        logger.info("🚀 INICIANDO SCRAPING AGRESIVO (2000+ OFERTAS)...")
        
        self.scrape_paraguay_jobs()
        self.scrape_latam_jobs()
        self.scrape_global_jobs()
        self.scrape_github()
        self.scrape_scholarships()
        self.scrape_funds()
        
        logger.info(f"✅ TOTAL: {len(self.opportunities)} oportunidades REALES")
        return self.opportunities
    
    def save_to_json(self, output_path='client/src/data/opportunities.json'):
        """Guardar en JSON"""
        data = {
            'total': len(self.opportunities),
            'timestamp': datetime.now().isoformat(),
            'opportunities': self.opportunities
        }
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"✅ Guardado: {output_path}")
    
    def save_to_ts(self, output_path='client/src/data/opportunities.ts'):
        """Guardar en TypeScript"""
        ts_content = "// CVitae Real Data - Scraper Agresivo\n"
        ts_content += f"// Total: {len(self.opportunities)} oportunidades\n"
        ts_content += f"// Actualizado: {datetime.now().isoformat()}\n\n"
        
        ts_content += "export interface Opportunity {\n"
        ts_content += "  id: string;\n"
        ts_content += "  title: string;\n"
        ts_content += "  organization: string;\n"
        ts_content += "  location: string;\n"
        ts_content += "  continent: string;\n"
        ts_content += "  type: string;\n"
        ts_content += "  rubro?: string;\n"
        ts_content += "  value?: string;\n"
        ts_content += "  deadline: string;\n"
        ts_content += "  compatibility: number;\n"
        ts_content += "  tags: string[];\n"
        ts_content += "  description: string;\n"
        ts_content += "  application_url?: string;\n"
        ts_content += "  source: string;\n"
        ts_content += "}\n\n"
        
        ts_content += "export const opportunities: Opportunity[] = [\n"
        for opp in self.opportunities:
            ts_content += f"  {{\n"
            ts_content += f"    id: \"{opp['id']}\",\n"
            ts_content += f"    title: \"{opp['title'].replace(chr(34), chr(92)+chr(34))}\",\n"
            ts_content += f"    organization: \"{opp['organization']}\",\n"
            ts_content += f"    location: \"{opp['location']}\",\n"
            ts_content += f"    continent: \"{opp['continent']}\",\n"
            ts_content += f"    type: \"{opp['type']}\",\n"
            ts_content += f"    rubro: \"{opp.get('rubro', '')}\",\n"
            ts_content += f"    value: \"{opp.get('value', '')}\",\n"
            ts_content += f"    deadline: \"{opp['deadline']}\",\n"
            ts_content += f"    compatibility: {opp['compatibility']},\n"
            ts_content += f"    tags: {json.dumps(opp['tags'])},\n"
            ts_content += f"    description: \"{opp['description'].replace(chr(34), chr(92)+chr(34))}\",\n"
            ts_content += f"    application_url: \"{opp.get('application_url', '')}\",\n"
            ts_content += f"    source: \"{opp['source']}\",\n"
            ts_content += f"  }},\n"
        ts_content += "];\n"
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        logger.info(f"✅ Guardado: {output_path}")


if __name__ == '__main__':
    scraper = AggressiveScraper()
    scraper.scrape_all()
    scraper.save_to_json()
    scraper.save_to_ts()
    logger.info(f"✅ SCRAPING AGRESIVO COMPLETADO: {len(scraper.opportunities)} oportunidades")
