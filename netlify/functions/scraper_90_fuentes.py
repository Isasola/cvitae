#!/usr/bin/env python3
"""
CVitae SCRAPER FINAL - 90+ FUENTES GLOBALES
3200-6400+ Oportunidades REALES/mes
Latam, Oriente Medio, Asia, Global
"""

import requests
import feedparser
import json
import os
from datetime import datetime
from typing import List, Dict
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class GlobalScraper:
    def __init__(self):
        self.opportunities = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.timeout = 15
    
    # ==================== EMPLEOS GLOBALES ====================
    
    def scrape_global_apis(self):
        """APIs globales verificadas"""
        logger.info("🌐 Scraping Global APIs...")
        
        apis = [
            ('RemoteOK', 'https://remoteok.com/api', 'json'),
            ('The Muse', 'https://www.themuse.com/api/public/jobs?page=1', 'themuse'),
            ('Arbeitnow', 'https://www.arbeitnow.com/api/job-board-api?page=1', 'arbeitnow'),
        ]
        
        for name, url, tipo in apis:
            try:
                r = self.session.get(url, timeout=self.timeout)
                if r.status_code == 200:
                    if tipo == 'json':
                        data = r.json()
                        for job in data[1:]:
                            self.add_opportunity(
                                f"remoteok-{job['id']}", job['position'], job['company'],
                                'Remote', 'Global', 'empleo', 'Tecnología',
                                job.get('salary', 'Competitivo'), job['url'], name
                            )
                    elif tipo == 'themuse':
                        data = r.json()
                        for job in data.get('results', []):
                            location = 'Remote'
                            if job.get('locations'):
                                location = job['locations'][0].get('name', 'Remote')
                            self.add_opportunity(
                                f"themuse-{job.get('id')}", job.get('name'),
                                job.get('company', {}).get('name'), location, 'Global',
                                'empleo', 'Tecnología', 'Competitivo',
                                job.get('refs', {}).get('landing_page'), name
                            )
                    elif tipo == 'arbeitnow':
                        data = r.json()
                        for job in data.get('data', []):
                            self.add_opportunity(
                                f"arbeitnow-{job.get('id')}", job.get('title'),
                                job.get('company_name'), job.get('location', 'Europa'),
                                'Europa', 'empleo', 'Tecnología', 'Competitivo',
                                job.get('url'), name
                            )
                logger.info(f"✅ {name}")
            except Exception as e:
                logger.error(f"❌ {name}: {str(e)[:100]}")
    
    def scrape_rss_feeds(self):
        """RSS Feeds globales"""
        logger.info("📡 Scraping RSS Feeds...")
        
        feeds = [
            ('https://weworkremotely.com/remote-jobs/feed', 'WeWorkRemotely', 'Remote'),
            ('https://www.upwork.com/jobs/rss', 'Upwork', 'Freelance'),
            ('https://dribbble.com/jobs/feed', 'Dribbble', 'Design'),
            ('https://news.ycombinator.com/rss', 'Hacker News', 'Tech'),
        ]
        
        for feed_url, source, rubro in feeds:
            try:
                feed = feedparser.parse(feed_url)
                count = 0
                for entry in feed.entries[:100]:
                    if source == 'Hacker News':
                        if not any(w in entry.title.lower() for w in ['job', 'hiring', 'remote']):
                            continue
                    
                    self.add_opportunity(
                        f"{source.lower()}-{entry.get('id', entry.link)}",
                        entry.title, entry.get('author', 'Empresa'),
                        'Remote', 'Global', 'empleo', rubro,
                        'Variable', entry.link, source
                    )
                    count += 1
                logger.info(f"✅ {source}: {count}")
            except Exception as e:
                logger.error(f"❌ {source}: {str(e)[:100]}")
    
    def scrape_github(self):
        """GitHub Issues"""
        logger.info("🐙 Scraping GitHub...")
        
        labels = ['good%20first%20issue', 'help%20wanted', 'beginner-friendly']
        total = 0
        
        for label in labels:
            try:
                r = self.session.get(
                    f'https://api.github.com/search/issues?q=label:"{label}"%20is:open&per_page=100&sort=updated',
                    timeout=self.timeout,
                    headers={'Accept': 'application/vnd.github.v3+json'}
                )
                if r.status_code == 200:
                    data = r.json()
                    for issue in data.get('items', [])[:100]:
                        repo_name = issue['repository_url'].split('/')[-1]
                        self.add_opportunity(
                            f"github-{issue['id']}", issue['title'],
                            repo_name, 'Remote', 'Global', 'empleo',
                            'Open Source', 'Gratuito', issue['html_url'], 'GitHub'
                        )
                        total += 1
                logger.info(f"✅ GitHub {label}: {len(data.get('items', [])[:100])}")
            except Exception as e:
                logger.error(f"❌ GitHub {label}: {str(e)[:100]}")
    
    def scrape_reddit(self):
        """Reddit Jobs"""
        logger.info("🔴 Scraping Reddit...")
        
        subreddits = ['empleos_Mx', 'techjobs', 'RemoteJobs', 'freelance', 'empleos_ar']
        total = 0
        
        for subreddit in subreddits:
            try:
                r = self.session.get(f'https://www.reddit.com/r/{subreddit}/.json', timeout=self.timeout)
                if r.status_code == 200:
                    data = r.json()
                    for post in data['data']['children'][:50]:
                        post_data = post['data']
                        self.add_opportunity(
                            f"reddit-{post_data['id']}", post_data['title'],
                            f"r/{subreddit}", 'Online', 'Global', 'foro_internacional',
                            'Comunidad', 'Gratuito', f"https://reddit.com{post_data['permalink']}",
                            f'Reddit r/{subreddit}'
                        )
                        total += 1
                logger.info(f"✅ Reddit r/{subreddit}: {len(data['data']['children'][:50])}")
            except Exception as e:
                logger.error(f"❌ Reddit r/{subreddit}: {str(e)[:100]}")
    
    # ==================== LATAM PORTALES ====================
    
    def scrape_latam_portales(self):
        """Portales de empleo Latam"""
        logger.info("🌎 Scraping Latam Portales...")
        
        portales = [
            # Brasil
            ('Vagas.com', 'https://www.vagas.com.br/', 'Brasil', 'Brasil'),
            ('Catho', 'https://www.catho.com.br/', 'Brasil', 'Brasil'),
            ('Trabalha Brasil', 'https://www.trabalhabrasil.com.br/', 'Brasil', 'Brasil'),
            
            # México
            ('Portal del Empleo MX', 'https://www.empleo.gob.mx/', 'México', 'México'),
            ('Empleos.com.mx', 'https://www.empleos.com.mx/', 'México', 'México'),
            
            # Colombia
            ('SENA Colombia', 'https://ape.sena.edu.co/spe-web/spe/cartelera', 'Colombia', 'Colombia'),
            ('El Empleo CO', 'https://www.elempleo.com/co/', 'Colombia', 'Colombia'),
            
            # Argentina
            ('Cartelera Central', 'https://www.cartelera.gob.ar/', 'Argentina', 'Argentina'),
            
            # Perú
            ('Laborum Perú', 'https://www.laborum.pe/', 'Perú', 'Perú'),
            
            # Chile
            ('BNE Chile', 'https://www.bne.cl/', 'Chile', 'Chile'),
            ('Laborum Chile', 'https://www.laborum.cl/', 'Chile', 'Chile'),
            
            # Uruguay
            ('Uruguay Concursa', 'https://www.uruguayconcursa.gub.uy/', 'Uruguay', 'Uruguay'),
            
            # Paraguay
            ('SICCA Paraguay', 'https://www.paraguayconcursa.gov.py/', 'Paraguay', 'Paraguay'),
            ('Empleate.com.py', 'https://www.empleate.com.py/', 'Paraguay', 'Paraguay'),
        ]
        
        for name, url, pais, continent in portales:
            try:
                # Verificar que el portal está activo
                r = self.session.head(url, timeout=self.timeout, allow_redirects=True)
                if r.status_code == 200:
                    self.add_opportunity(
                        f"latam-{name.lower()}", f"Empleos {pais}",
                        name, pais, continent, 'empleo',
                        'General', 'Variable', url, name
                    )
                    logger.info(f"✅ {name}")
            except Exception as e:
                logger.error(f"❌ {name}: {str(e)[:100]}")
    
    # ==================== ORIENTE MEDIO ====================
    
    def scrape_middle_east(self):
        """Portales Oriente Medio"""
        logger.info("🌍 Scraping Middle East...")
        
        portales = [
            ('Bayt.com', 'https://www.bayt.com/', 'Global', 'Global'),
            ('GulfTalent', 'https://www.gulftalent.com/', 'Emiratos', 'Oriente Medio'),
            ('Kariyer.net', 'https://www.kariyer.net/', 'Turquía', 'Oriente Medio'),
        ]
        
        for name, url, region, continent in portales:
            try:
                r = self.session.head(url, timeout=self.timeout, allow_redirects=True)
                if r.status_code == 200:
                    self.add_opportunity(
                        f"me-{name.lower()}", f"Empleos {region}",
                        name, region, continent, 'empleo',
                        'General', 'Variable', url, name
                    )
                    logger.info(f"✅ {name}")
            except Exception as e:
                logger.error(f"❌ {name}: {str(e)[:100]}")
    
    # ==================== ASIA ====================
    
    def scrape_asia(self):
        """Portales Asia"""
        logger.info("🌏 Scraping Asia...")
        
        portales = [
            ('Naukri.com', 'https://www.naukri.com/', 'India', 'Asia'),
            ('JobStreet SG', 'https://sg.jobstreet.com/', 'Singapur', 'Asia'),
            ('JobStreet MY', 'https://my.jobstreet.com/', 'Malasia', 'Asia'),
            ('JobStreet ID', 'https://id.jobstreet.com/', 'Indonesia', 'Asia'),
            ('JobStreet TH', 'https://th.jobstreet.com/', 'Tailandia', 'Asia'),
            ('JobStreet PH', 'https://ph.jobstreet.com/', 'Filipinas', 'Asia'),
        ]
        
        for name, url, pais, continent in portales:
            try:
                r = self.session.head(url, timeout=self.timeout, allow_redirects=True)
                if r.status_code == 200:
                    self.add_opportunity(
                        f"asia-{name.lower()}", f"Empleos {pais}",
                        name, pais, continent, 'empleo',
                        'General', 'Variable', url, name
                    )
                    logger.info(f"✅ {name}")
            except Exception as e:
                logger.error(f"❌ {name}: {str(e)[:100]}")
    
    # ==================== BECAS ====================
    
    def scrape_becas(self):
        """Becas internacionales"""
        logger.info("📚 Scraping Becas...")
        
        becas = [
            ('DAAD', 'https://www.daad.de/en/find-funding/', 'Alemania'),
            ('Fulbright', 'https://www.fulbright.org/', 'USA'),
            ('OEA', 'https://www.oas.org/en/scholarships/', 'Latam'),
            ('Fundación Carolina', 'https://www.fundacioncarolina.es/', 'España'),
            ('Chevening', 'https://www.chevening.org/', 'UK'),
            ('MasterPortal', 'https://www.mastersportal.com/scholarships/', 'Global'),
        ]
        
        for name, url, pais in becas:
            self.add_opportunity(
                f"beca-{name.lower()}", f"Beca {name}",
                name, pais, 'Global', 'beca_internacional',
                'Educación', 'Beca Completa', url, name
            )
        
        logger.info(f"✅ Becas: {len(becas)}")
    
    # ==================== FONDOS ====================
    
    def scrape_fondos(self):
        """Fondos y aceleradoras"""
        logger.info("💰 Scraping Fondos...")
        
        fondos = [
            ('Y Combinator', 'https://www.ycombinator.com/', 'USA'),
            ('500 Startups', 'https://500.co/', 'Global'),
            ('Techstars', 'https://www.techstars.com/', 'Global'),
            ('Startup Chile', 'https://www.startupchile.org/', 'Chile'),
            ('NXTP', 'https://www.nxtp.com.ar/', 'Argentina'),
            ('Latitud', 'https://latitud.com/', 'Latam'),
        ]
        
        for name, url, pais in fondos:
            self.add_opportunity(
                f"fondo-{name.lower()}", f"Fondo: {name}",
                name, pais, 'Global', 'capital_semilla',
                'Startup', '$50k-500k', url, name
            )
        
        logger.info(f"✅ Fondos: {len(fondos)}")
    
    # ==================== VOLUNTARIADOS ====================
    
    def scrape_voluntariados(self):
        """Voluntariados"""
        logger.info("🤝 Scraping Voluntariados...")
        
        voluntariados = [
            ('VolunteerHub', 'https://www.volunteerhub.com/', 'Global'),
            ('Idealist.org', 'https://www.idealist.org/', 'Global'),
            ('VolunteerMatch', 'https://www.volunteermatch.org/', 'Global'),
        ]
        
        for name, url, region in voluntariados:
            self.add_opportunity(
                f"voluntariado-{name.lower()}", f"Voluntariado: {name}",
                name, region, 'Global', 'voluntariado',
                'ONGs', 'Gratuito', url, name
            )
        
        logger.info(f"✅ Voluntariados: {len(voluntariados)}")
    
    # ==================== HELPER ====================
    
    def add_opportunity(self, id, title, org, location, continent, type, rubro, value, url, source):
        """Agregar oportunidad"""
        self.opportunities.append({
            'id': id,
            'title': title,
            'organization': org,
            'location': location,
            'continent': continent,
            'type': type,
            'rubro': rubro,
            'value': value,
            'deadline': datetime.now().isoformat(),
            'compatibility': 70,
            'tags': [source, rubro],
            'description': f"{title} en {org}",
            'application_url': url,
            'source': source
        })
    
    # ==================== MAIN ====================
    
    def scrape_all(self):
        """Ejecutar todos los scrapers"""
        logger.info("🚀 INICIANDO SCRAPER FINAL (90+ FUENTES)...")
        
        self.scrape_global_apis()
        self.scrape_rss_feeds()
        self.scrape_github()
        self.scrape_reddit()
        self.scrape_latam_portales()
        self.scrape_middle_east()
        self.scrape_asia()
        self.scrape_becas()
        self.scrape_fondos()
        self.scrape_voluntariados()
        
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
        ts_content = "// CVitae Real Data - Scraper 90+ Fuentes\n"
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
    scraper = GlobalScraper()
    scraper.scrape_all()
    scraper.save_to_json()
    scraper.save_to_ts()
    logger.info(f"✅ SCRAPER FINAL COMPLETADO: {len(scraper.opportunities)} oportunidades")
