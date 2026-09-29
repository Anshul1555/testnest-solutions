// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('SEO & Metadata Verification', () => {
  const rootDir = path.resolve(__dirname, '../..');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  it('contains comprehensive title, description, and keyword tags', () => {
    expect(indexHtml).toMatch(/<title>TestNest Solutions Inc\. \| Top Software Testing &amp; QA Automation Services Canada<\/title>/);
    expect(indexHtml).toMatch(/<meta name="description" content="TestNest Solutions Inc\. delivers premier Software Testing/);
    expect(indexHtml).toMatch(/<meta name="keywords" content="Software Testing Services Canada, QA Automation Company/);
    expect(indexHtml).toMatch(/<link rel="canonical" href="https:\/\/anshul1555\.github\.io\/testnest-solutions\/"/);
  });

  it('contains complete Open Graph and Twitter Card tags', () => {
    expect(indexHtml).toMatch(/<meta property="og:type" content="website">/);
    expect(indexHtml).toMatch(/<meta property="og:title" content="TestNest Solutions Inc\. \| Top Software Testing &amp; QA Automation Services Canada">/);
    expect(indexHtml).toMatch(/<meta property="og:image" content="https:\/\/anshul1555\.github\.io\/testnest-solutions\/og-image\.png">/);
    expect(indexHtml).toMatch(/<meta property="og:url" content="https:\/\/anshul1555\.github\.io\/testnest-solutions\/">/);
    expect(indexHtml).toMatch(/<meta name="twitter:card" content="summary_large_image">/);
    expect(indexHtml).toMatch(/<meta name="twitter:image" content="https:\/\/anshul1555\.github\.io\/testnest-solutions\/og-image\.png">/);
  });

  it('contains valid Schema.org JSON-LD Knowledge Graph with Organization, WebSite, Service, and FAQPage', () => {
    const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).toBeTruthy();
    
    const parsed = JSON.parse(jsonLdMatch[1]);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@graph']).toBeDefined();
    
    const types = parsed['@graph'].map(item => Array.isArray(item['@type']) ? item['@type'].join(',') : item['@type']);
    expect(types.some(t => t.includes('Organization'))).toBe(true);
    expect(types.some(t => t.includes('WebSite'))).toBe(true);
    expect(types.some(t => t.includes('ItemList'))).toBe(true);
    expect(types.some(t => t.includes('FAQPage'))).toBe(true);
  });

  it('contains robots.txt and sitemap.xml with valid crawler directives', () => {
    const robotsTxt = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf-8');
    expect(robotsTxt).toMatch(/User-agent: \*/);
    expect(robotsTxt).toMatch(/Allow: \//);
    expect(robotsTxt).toMatch(/Sitemap: https:\/\/anshul1555\.github\.io\/testnest-solutions\/sitemap\.xml/);

    const sitemapXml = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf-8');
    expect(sitemapXml).toMatch(/<urlset/);
    expect(sitemapXml).toMatch(/https:\/\/anshul1555\.github\.io\/testnest-solutions\//);
    expect(sitemapXml).toMatch(/<image:image>/);
  });

  it('has verified PWA manifest and optimized image assets in public directory', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'public/site.webmanifest'), 'utf-8'));
    expect(manifest.name).toContain('TestNest Solutions');
    expect(manifest.start_url).toBe('/testnest-solutions/');

    expect(fs.existsSync(path.join(rootDir, 'public/og-image.png'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'public/logo-64.png'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'public/favicon-32x32.png'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'public/apple-touch-icon.png'))).toBe(true);
  });
});
