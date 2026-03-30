#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distPath = path.join(projectRoot, 'dist/public');
const robotsPath = path.join(distPath, 'robots.txt');

const SITE_URL = 'https://cvitae-py.netlify.app';

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

const robotsTxt = `# CVitae Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /.netlify
Disallow: /api

Crawl-delay: 1

Sitemap: ${SITE_URL}/sitemap.xml

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /
`;

fs.writeFileSync(robotsPath, robotsTxt);
console.log('✅ robots.txt generated: ' + robotsPath);
