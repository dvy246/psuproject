#!/usr/bin/env node
/**
 * check-broken-links.mjs
 *
 * Automated test suite that crawls every HTML file in dist/
 * and verifies that 100% of internal links point to valid, existing static routes.
 * Flags any 404s, broken subpaths, or missing localized pages.
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');

function getAllHtmlFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const HREF_REGEX = /<a\s+[^>]*href=["']([^"']+)["']/gi;

function getRouteFromPath(filePath) {
  const rel = path.relative(DIST_DIR, filePath);
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) {
    return '/' + rel.slice(0, -'/index.html'.length);
  }
  if (rel.endsWith('.html')) {
    return '/' + rel.slice(0, -'.html'.length);
  }
  return '/' + rel;
}

function resolveInternalLink(currentRoute, href) {
  if (!href || href.startsWith('http://') || href.startsWith('https://') || 
      href.startsWith('mailto:') || href.startsWith('tel:') || 
      href.startsWith('javascript:') || href.startsWith('#')) {
    return null;
  }

  const cleanHref = href.split(/[?#]/)[0];
  if (!cleanHref) return null;

  if (cleanHref.startsWith('/')) {
    return cleanHref;
  }

  const currentDir = currentRoute.endsWith('/') ? currentRoute : path.dirname(currentRoute) + '/';
  return path.posix.normalize(path.posix.join(currentDir, cleanHref));
}

function checkRouteExists(targetRoute) {
  const normalized = targetRoute.replace(/\/+$/, '');
  const testPaths = [
    path.join(DIST_DIR, targetRoute),
    path.join(DIST_DIR, targetRoute, 'index.html'),
    path.join(DIST_DIR, `${normalized}.html`),
    path.join(DIST_DIR, `${normalized}/index.html`),
  ];

  for (const p of testPaths) {
    if (existsSync(p)) return true;
  }
  return false;
}

async function run() {
  console.log('🔍 Starting comprehensive broken route / 404 audit...');
  
  if (!existsSync(DIST_DIR)) {
    console.error('❌ Error: dist/ directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const allFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`📁 Found ${allFiles.length.toLocaleString()} HTML files in dist/`);

  let totalLinksChecked = 0;
  const brokenLinks = new Map();
  const verifiedRoutes = new Set();
  const failedRoutes = new Set();

  for (const filePath of allFiles) {
    const route = getRouteFromPath(filePath);
    const content = readFileSync(filePath, 'utf8');

    let match;
    HREF_REGEX.lastIndex = 0;
    while ((match = HREF_REGEX.exec(content)) !== null) {
      const href = match[1];
      const targetRoute = resolveInternalLink(route, href);
      if (!targetRoute) continue;

      totalLinksChecked++;

      if (verifiedRoutes.has(targetRoute)) {
        continue;
      }
      if (failedRoutes.has(targetRoute)) {
        if (!brokenLinks.has(targetRoute)) brokenLinks.set(targetRoute, []);
        brokenLinks.get(targetRoute).push({ source: route, href });
        continue;
      }

      const exists = checkRouteExists(targetRoute);
      if (exists) {
        verifiedRoutes.add(targetRoute);
      } else {
        failedRoutes.add(targetRoute);
        if (!brokenLinks.has(targetRoute)) brokenLinks.set(targetRoute, []);
        brokenLinks.get(targetRoute).push({ source: route, href });
      }
    }
  }

  console.log('========================================');
  console.log(`📊 AUDIT SUMMARY:`);
  console.log(`- Total HTML Files Scanned: ${allFiles.length.toLocaleString()}`);
  console.log(`- Total Internal Links Checked: ${totalLinksChecked.toLocaleString()}`);
  console.log(`- Unique Valid Internal Routes: ${verifiedRoutes.size.toLocaleString()}`);
  console.log(`- Unique Broken / 404 Routes: ${failedRoutes.size}`);
  console.log('========================================');

  if (brokenLinks.size > 0) {
    console.error('❌ BROKEN ROUTES FOUND:');
    for (const [brokenRoute, occurrences] of brokenLinks.entries()) {
      console.error(`\n🔴 404 Route: "${brokenRoute}"`);
      console.error(`   Found in ${occurrences.length} place(s):`);
      for (const occ of occurrences.slice(0, 5)) {
        console.error(`   - Source: ${occ.source} (href="${occ.href}")`);
      }
      if (occurrences.length > 5) {
        console.error(`   ... and ${occurrences.length - 5} more sources`);
      }
    }
    console.error('\n❌ AUDIT FAILED: Broken routes were detected.');
    process.exit(1);
  } else {
    console.log('🎉 100% PASS: Zero broken routes or 404 errors detected across the entire site!');
    process.exit(0);
  }
}

run();
