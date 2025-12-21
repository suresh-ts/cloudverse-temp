/**
 * CloudVerse Asset Importer - REAL IMPLEMENTATION
 * Usage: node scripts/import-cloudverse-assets.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_ROOT = path.resolve(__dirname, '../client/public/assets/cloudverse-import');
const MANIFEST_FILE = path.join(ASSETS_ROOT, 'manifest.json');
const BY_PAGE_MANIFEST_FILE = path.join(ASSETS_ROOT, 'manifest.byPage.json');
const LINKS_MANIFEST_FILE = path.join(ASSETS_ROOT, 'links-manifest.json');

const BASE_URL = 'https://cloudverse.ai';
const PAGES_TO_CRAWL = [
  '/',
  '/platform',
  '/integrations',
  '/pricing',
  '/about-us',
  '/partners',
  '/blog'
];

// State
const globalAssetMap = new Map(); // originalUrl -> localPath
const pageAssetsMap = {}; // pageUrl -> [localPath]
const foundLinks = []; // { source, text, href }
const processedAssets = new Set(); // URL strings to avoid redownloading

// Ensure directory exists
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Helper: Normalize URL
function resolveUrl(url, base = BASE_URL) {
  try {
    return new URL(url, base).href;
  } catch (e) {
    return null;
  }
}

// Helper: Download file
async function downloadFile(url, localPath) {
  if (processedAssets.has(url)) return false;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!res.ok) {
      console.warn(`[WARN] Failed to fetch ${url}: ${res.status} ${res.statusText}`);
      return false;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await ensureDir(path.dirname(localPath));
    await fs.writeFile(localPath, buffer);
    
    processedAssets.add(url);
    console.log(`[OK] Downloaded: ${path.basename(localPath)}`);
    return true;
  } catch (e) {
    console.error(`[ERR] Error downloading ${url}:`, e.message);
    return false;
  }
}

// Helper: Parse Next.js Image URL
// /_next/image?url=%2Fimages%2Ffoobar.png&w=3840&q=75
function parseNextJsUrl(fullUrl) {
  try {
    const u = new URL(fullUrl);
    if (u.pathname.includes('/_next/image')) {
      const originalSrc = u.searchParams.get('url');
      if (originalSrc) {
        // Return absolute URL of the original source
        return resolveUrl(originalSrc, BASE_URL);
      }
    }
  } catch (e) {}
  return null;
}

async function processPage(pagePath) {
  const fullUrl = resolveUrl(pagePath);
  console.log(`\nCrawling: ${fullUrl}`);
  
  let html;
  try {
    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    html = await res.text();
  } catch (e) {
    console.error(`Failed to load page ${fullUrl}:`, e.message);
    return;
  }

  const $ = cheerio.load(html);
  const pageAssetList = [];

  // 1. Extract Links
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    if (href && text) {
      foundLinks.push({
        source: fullUrl,
        text,
        href
      });
    }
  });

  // 2. Extract Images
  const candidates = new Set();

  // img src
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src) candidates.add(resolveUrl(src));
    
    const srcset = $(el).attr('srcset');
    if (srcset) {
      srcset.split(',').forEach(part => {
        const url = part.trim().split(' ')[0];
        if (url) candidates.add(resolveUrl(url));
      });
    }
  });

  // link rel=preload as=image
  $('link[rel="preload"][as="image"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) candidates.add(resolveUrl(href));
  });

  // inline styles (background-image)
  $('*[style]').each((_, el) => {
    const style = $(el).attr('style');
    const match = style.match(/url\(['"]?([^'")]+)['"]?\)/);
    if (match && match[1]) {
      candidates.add(resolveUrl(match[1]));
    }
  });

  // Process Candidates
  for (const assetUrl of candidates) {
    if (!assetUrl) continue;

    // Filter relevant assets (images, svgs)
    const ext = path.extname(new URL(assetUrl).pathname).toLowerCase();
    const isImage = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].includes(ext) || assetUrl.includes('/_next/image');
    
    if (!isImage) continue;

    // Handle Next.js Optimized URLs
    let targetUrl = assetUrl;
    let originalSrc = parseNextJsUrl(assetUrl);
    
    // Logic: Try to download the raw asset first (originalSrc), if that fails, use the optimized one
    // But for the sake of simplicity and "Task D" logic:
    // "Attempt direct download of decoded... fallback to original"
    
    let downloadUrl = targetUrl;
    let localRelPath = '';

    if (originalSrc) {
      // It's a next/image URL
      // Try to construct a nice local path from the original src
      const parsedOriginal = new URL(originalSrc);
      localRelPath = parsedOriginal.pathname.replace(/^\//, ''); // Remove leading slash
      downloadUrl = originalSrc;
    } else {
      // Standard image
      const parsed = new URL(targetUrl);
      localRelPath = parsed.pathname.replace(/^\//, '');
      // Handle root assets or weird paths
      if (localRelPath === '' || localRelPath.endsWith('/')) {
        localRelPath += `asset_${Date.now()}.png`;
      }
    }

    // Ensure extension
    if (!path.extname(localRelPath)) {
        localRelPath += '.png'; // Fallback
    }

    // Prepare local system path
    const localFsPath = path.join(ASSETS_ROOT, localRelPath);
    
    // Download
    let success = false;
    
    // Try primary (un-optimized or standard)
    success = await downloadFile(downloadUrl, localFsPath);
    
    // If failed and it was a next/image derived url, try the optimized version as fallback
    if (!success && originalSrc && downloadUrl !== assetUrl) {
       console.log(`[INFO] Fallback to optimized URL for ${localRelPath}`);
       success = await downloadFile(assetUrl, localFsPath);
    }

    if (success) {
      // Update manifests
      const webPath = `/assets/cloudverse-import/${localRelPath}`;
      globalAssetMap.set(assetUrl, webPath);
      pageAssetList.push(webPath);
      
      // Also map the "original source" key if we successfully downloaded the raw version
      if (originalSrc) {
         globalAssetMap.set(originalSrc, webPath);
      }
    }
  }

  pageAssetsMap[fullUrl] = pageAssetList;
}

async function main() {
  console.log("Starting CloudVerse Asset Importer...");
  await ensureDir(ASSETS_ROOT);

  for (const page of PAGES_TO_CRAWL) {
    await processPage(page);
  }

  // Write Manifests
  console.log("\nWriting manifests...");
  
  // 1. Asset Manifest
  const manifestObj = Object.fromEntries(globalAssetMap);
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifestObj, null, 2));
  
  // 2. By Page Manifest
  await fs.writeFile(BY_PAGE_MANIFEST_FILE, JSON.stringify(pageAssetsMap, null, 2));

  // 3. Links Manifest
  await fs.writeFile(LINKS_MANIFEST_FILE, JSON.stringify(foundLinks, null, 2));

  console.log("Done! Assets imported to client/public/assets/cloudverse-import/");
}

main().catch(console.error);
