#!/usr/bin/env python3
"""
CVitae SCRAPER EXPANDIDO - 1500+ Oportunidades Reales
Fuentes: APIs directas, RSS, Scraping, GitHub
"""

import requests
import feedparser
import json
import os
from datetime import datetime
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ExpandedScraper:
    def __init__(self):
        self.opportunities = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    def scrape_remoteok(self):
        """RemoteOK: 95+ empleos"""
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
                logger.info(f"✅ RemoteOK: {len(data)-1}")
        except Exception as e:
            logger.error(f"❌ RemoteOK: {e}")
    
    def scrape_themuse(self):
        """The Muse: 100+ empleos"""
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
                            'id': f"themuse-{job.get('id')}",
                            'title': job.get('name'),
                            'organization': job.get('company', {}).get('name'),
                            'location': location,
                            'continent': 'Global',
                            'type': 'empleo',
                            'rubro': 'Tecnología',
                            'value': 'Competitivo',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 70,
                            'tags': ['Tech', 'Entry-level'],
                            'description': job.get('short_description', '')[:200],
                            'application_url': job.get('refs', {}).get('landing_page'),
                            'source': 'The Muse'
                        })
            logger.info(f"✅ The Muse: ~100")
        except Exception as e:
            logger.error(f"❌ The Muse: {e}")
    
    def scrape_arbeitnow(self):
        """Arbeitnow: 300+ empleos"""
        try:
            for page in range(1, 6):
                r = self.session.get(f'https://www.arbeitnow.com/api/job-board-api?page={page}', timeout=10)
                if r.status_code == 200:
                    data = r.json()
                    for job in data.get('data', []):
                        self.opportunities.append({
                            'id': f"arbeitnow-{job.get('id')}",
                            'title': job.get('title'),
                            'organization': job.get('company_name'),
                            'location': job.get('location', 'Europa'),
                            'continent': 'Europa',
                            'type': 'empleo',
                            'rubro': 'Tecnología',
                            'value': 'Competitivo',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 72,
                            'tags': ['Tech', 'Europa'],
                            'description': job.get('description', '')[:200],
                            'application_url': job.get('url'),
                            'source': 'Arbeitnow'
                        })
            logger.info(f"✅ Arbeitnow: ~300")
        except Exception as e:
            logger.error(f"❌ Arbeitnow: {e}")
    
    def scrape_github(self):
        """GitHub: 300+ issues"""
        try:
            labels = ['good%20first%20issue', 'help%20wanted', 'beginner-friendly']
            for label in labels:
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
                            'value': 'Gratuito',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 75,
                            'tags': ['GitHub', 'Open Source'],
                            'description': (issue.get('body') or '')[:200],
                            'application_url': issue['html_url'],
                            'source': 'GitHub Issues'
                        })
            logger.info(f"✅ GitHub: ~300")
        except Exception as e:
            logger.error(f"❌ GitHub: {e}")
    
    def scrape_upwork(self):
        """Upwork: 100+ proyectos"""
        try:
            feed = feedparser.parse('https://www.upwork.com/jobs/rss')
            for entry in feed.entries[:100]:
                self.opportunities.append({
                    'id': f"upwork-{entry.get('id', entry.link)}",
                    'title': entry.title,
                    'organization': 'Upwork',
                    'location': 'Remote',
                    'continent': 'Global',
                    'type': 'empleo',
                    'rubro': 'Freelance',
                    'value': 'Variable',
                    'deadline': datetime.now().isoformat(),
                    'compatibility': 70,
                    'tags': ['Freelance', 'Upwork'],
                    'description': (entry.get('summary') or '')[:200],
                    'application_url': entry.link,
                    'source': 'Upwork'
                })
            logger.info(f"✅ Upwork: {len(feed.entries[:100])}")
        except Exception as e:
            logger.error(f"❌ Upwork: {e}")
    
    def scrape_dribbble(self):
        """Dribbble: 100+ trabajos de diseño"""
        try:
            feed = feedparser.parse('https://dribbble.com/jobs/feed')
            for entry in feed.entries[:100]:
                self.opportunities.append({
                    'id': f"dribbble-{entry.get('id', entry.link)}",
                    'title': entry.title,
                    'organization': 'Dribbble',
                    'location': 'Remote',
                    'continent': 'Global',
                    'type': 'empleo',
                    'rubro': 'Design',
                    'value': 'Variable',
                    'deadline': datetime.now().isoformat(),
                    'compatibility': 72,
                    'tags': ['Design', 'Freelance'],
                    'description': (entry.get('summary') or '')[:200],
                    'application_url': entry.link,
                    'source': 'Dribbble'
                })
            logger.info(f"✅ Dribbble: {len(feed.entries[:100])}")
        except Exception as e:
            logger.error(f"❌ Dribbble: {e}")
    
    def scrape_weworkremotely(self):
        """WeWorkRemotely: 100+ empleos remotos"""
        try:
            feed = feedparser.parse('https://weworkremotely.com/remote-jobs/feed')
            for entry in feed.entries[:100]:
                self.opportunities.append({
                    'id': f"wwr-{entry.get('id', entry.link)}",
                    'title': entry.title,
                    'organization': entry.get('author', 'Empresa'),
                    'location': 'Remote',
                    'continent': 'Global',
                    'type': 'empleo',
                    'rubro': 'General',
                    'value': 'Competitivo',
                    'deadline': datetime.now().isoformat(),
                    'compatibility': 73,
                    'tags': ['Remote', 'Global'],
                    'description': (entry.get('summary') or '')[:200],
                    'application_url': entry.link,
                    'source': 'WeWorkRemotely'
                })
            logger.info(f"✅ WeWorkRemotely: {len(feed.entries[:100])}")
        except Exception as e:
            logger.error(f"❌ WeWorkRemotely: {e}")
    
    def scrape_hackernews(self):
        """Hacker News: 100+ posts de empleos"""
        try:
            feed = feedparser.parse('https://news.ycombinator.com/rss')
            for entry in feed.entries[:100]:
                if any(word in entry.title.lower() for word in ['job', 'hiring', 'remote', 'work']):
                    self.opportunities.append({
                        'id': f"hn-{entry.get('id', entry.link)}",
                        'title': entry.title,
                        'organization': 'Hacker News',
                        'location': 'Remote',
                        'continent': 'Global',
                        'type': 'foro_internacional',
                        'rubro': 'Tech',
                        'value': 'Variable',
                        'deadline': datetime.now().isoformat(),
                        'compatibility': 65,
                        'tags': ['Hacker News', 'Tech'],
                        'description': (entry.get('summary') or '')[:200],
                        'application_url': entry.link,
                        'source': 'Hacker News'
                    })
            logger.info(f"✅ Hacker News: ~50")
        except Exception as e:
            logger.error(f"❌ Hacker News: {e}")
    
    def scrape_reddit(self):
        """Reddit: 100+ posts de empleos"""
        try:
            subreddits = ['empleos_Mx', 'techjobs', 'RemoteJobs', 'freelance']
            for subreddit in subreddits:
                r = self.session.get(
                    f'https://www.reddit.com/r/{subreddit}/.json',
                    timeout=10
                )
                if r.status_code == 200:
                    data = r.json()
                    for post in data['data']['children'][:25]:
                        post_data = post['data']
                        self.opportunities.append({
                            'id': f"reddit-{post_data['id']}",
                            'title': post_data['title'],
                            'organization': f"r/{subreddit}",
                            'location': 'Online',
                            'continent': 'Global',
                            'type': 'foro_internacional',
                            'rubro': 'Comunidad',
                            'value': 'Gratuito',
                            'deadline': datetime.now().isoformat(),
                            'compatibility': 60,
                            'tags': ['Reddit', subreddit],
                            'description': (post_data.get('selftext') or '')[:200],
                            'application_url': f"https://reddit.com{post_data['permalink']}",
                            'source': f'Reddit r/{subreddit}'
                        })
            logger.info(f"✅ Reddit: ~100")
        except Exception as e:
            logger.error(f"❌ Reddit: {e}")
    
    def scrape_kickstarter(self):
        """Kickstarter: 50+ proyectos"""
        try:
            feed = feedparser.parse('https://www.kickstarter.com/projects/recent.rss')
            for entry in feed.entries[:50]:
                self.opportunities.append({
                    'id': f"kickstarter-{entry.get('id', entry.link)}",
                    'title': entry.title,
                    'organization': 'Kickstarter',
                    'location': 'Global',
                    'continent': 'Global',
                    'type': 'capital_semilla',
                    'rubro': 'Crowdfunding',
                    'value': 'Variable',
                    'deadline': datetime.now().isoformat(),
                    'compatibility': 70,
                    'tags': ['Crowdfunding', 'Kickstarter'],
                    'description': (entry.get('summary') or '')[:200],
                    'application_url': entry.link,
                    'source': 'Kickstarter'
                })
            logger.info(f"✅ Kickstarter: {len(feed.entries[:50])}")
        except Exception as e:
            logger.error(f"❌ Kickstarter: {e}")
    
    def scrape_all(self):
        """Ejecutar todos los scrapers"""
        logger.info("🚀 INICIANDO SCRAPING EXPANDIDO...")
        
        self.scrape_remoteok()
        self.scrape_themuse()
        self.scrape_arbeitnow()
        self.scrape_github()
        self.scrape_upwork()
        self.scrape_dribbble()
        self.scrape_weworkremotely()
        self.scrape_hackernews()
        self.scrape_reddit()
        self.scrape_kickstarter()
        
        logger.info(f"✅ TOTAL: {len(self.opportunities)} oportunidades")
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
        ts_content = "// CVitae Real Data - Scraper Expandido\n"
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
    scraper = ExpandedScraper()
    scraper.scrape_all()
    scraper.save_to_json()
    scraper.save_to_ts()
    logger.info(f"✅ COMPLETADO: {len(scraper.opportunities)} oportunidades")
