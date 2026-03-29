#!/usr/bin/env node

/**
 * SEO Checker Script
 * 
 * Usage:
 *   node scripts/check-seo.js [url]
 * 
 * Examples:
 *   node scripts/check-seo.js http://localhost:3000/en
 *   node scripts/check-seo.js https://your-site.com/ja
 */

import { JSDOM } from 'jsdom';

const url = process.argv[2] || 'http://localhost:3000/en';

console.log(`\n🔍 Checking SEO for: ${url}\n`);

async function checkSEO(targetUrl) {
  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch: ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results = {
      passed: 0,
      failed: 0,
      warnings: 0,
    };

    function pass(message) {
      console.log(`✅ ${message}`);
      results.passed++;
    }

    function fail(message) {
      console.log(`❌ ${message}`);
      results.failed++;
    }

    function warn(message) {
      console.log(`⚠️  ${message}`);
      results.warnings++;
    }

    // Title
    console.log('\n📄 Basic Meta Tags:');
    const title = document.querySelector('title');
    if (title?.textContent) {
      pass(`Title: "${title.textContent}"`);
      if (title.textContent.length > 60) {
        warn(`Title is ${title.textContent.length} chars (recommended: 50-60)`);
      }
    } else {
      fail('Missing title tag');
    }

    // Description
    const description = document.querySelector('meta[name="description"]');
    if (description?.getAttribute('content')) {
      const desc = description.getAttribute('content');
      pass(`Description: "${desc?.substring(0, 50)}..."`);
      if (desc && desc.length > 160) {
        warn(`Description is ${desc.length} chars (recommended: 150-160)`);
      }
    } else {
      fail('Missing meta description');
    }

    // Keywords
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords?.getAttribute('content')) {
      pass(`Keywords found`);
    } else {
      warn('Missing meta keywords (optional but helpful)');
    }

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical?.getAttribute('href')) {
      pass(`Canonical URL: ${canonical.getAttribute('href')}`);
    } else {
      fail('Missing canonical URL');
    }

    // Open Graph
    console.log('\n🌐 Open Graph Tags:');
    const ogTags = [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'og:locale',
    ];

    ogTags.forEach((tag) => {
      const element = document.querySelector(`meta[property="${tag}"]`);
      if (element?.getAttribute('content')) {
        pass(`${tag}: ${element.getAttribute('content')?.substring(0, 50)}...`);
      } else {
        fail(`Missing ${tag}`);
      }
    });

    // Twitter Card
    console.log('\n🐦 Twitter Card Tags:');
    const twitterTags = [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:creator',
    ];

    twitterTags.forEach((tag) => {
      const element = document.querySelector(`meta[name="${tag}"]`);
      if (element?.getAttribute('content')) {
        pass(`${tag}: ${element.getAttribute('content')?.substring(0, 50)}...`);
      } else {
        fail(`Missing ${tag}`);
      }
    });

    // JSON-LD
    console.log('\n📊 Structured Data (JSON-LD):');
    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript?.textContent) {
      try {
        const jsonLd = JSON.parse(jsonLdScript.textContent);
        pass('JSON-LD found and valid');
        
        if (jsonLd['@context'] === 'https://schema.org') {
          pass('Schema.org context present');
        }
        
        if (jsonLd['@graph']) {
          const types = jsonLd['@graph'].map((item) => item['@type']).join(', ');
          pass(`Schema types: ${types}`);
        }
      } catch (e) {
        fail('JSON-LD is invalid JSON');
      }
    } else {
      warn('No JSON-LD structured data found');
    }

    // Alternate Languages
    console.log('\n🌍 Internationalization:');
    const htmlLang = document.querySelector('html')?.getAttribute('lang');
    if (htmlLang) {
      pass(`HTML lang attribute: ${htmlLang}`);
    } else {
      fail('Missing HTML lang attribute');
    }

    const alternates = document.querySelectorAll('link[rel="alternate"]');
    if (alternates.length > 0) {
      pass(`${alternates.length} alternate language links found`);
      alternates.forEach((alt) => {
        const hreflang = alt.getAttribute('hreflang');
        const href = alt.getAttribute('href');
        console.log(`   - ${hreflang}: ${href}`);
      });
    } else {
      warn('No alternate language links found');
    }

    // Robots
    console.log('\n🤖 Robots & Indexing:');
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      const content = robots.getAttribute('content');
      if (content?.includes('noindex')) {
        warn(`Robots: ${content} (page will not be indexed)`);
      } else {
        pass(`Robots: ${content || 'default (indexable)'}`);
      }
    } else {
      pass('No robots meta (default: indexable)');
    }

    // Viewport
    console.log('\n📱 Mobile & Performance:');
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport?.getAttribute('content')?.includes('width=device-width')) {
      pass('Viewport meta tag configured');
    } else {
      fail('Missing or incorrect viewport meta tag');
    }

    // Charset
    const charset = document.querySelector('meta[charset]');
    if (charset) {
      pass(`Charset: ${charset.getAttribute('charset')}`);
    } else {
      warn('Missing charset meta tag');
    }

    // Headings
    console.log('\n📝 Content Structure:');
    const h1 = document.querySelectorAll('h1');
    if (h1.length === 1) {
      pass(`One H1 tag found: "${h1[0].textContent?.substring(0, 50)}..."`);
    } else if (h1.length === 0) {
      fail('No H1 tag found');
    } else {
      warn(`Multiple H1 tags found (${h1.length}) - should have only one`);
    }

    // Images without alt
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(
      (img) => !img.getAttribute('alt')
    );
    if (imagesWithoutAlt.length === 0) {
      pass(`All ${images.length} images have alt attributes`);
    } else {
      warn(`${imagesWithoutAlt.length} images missing alt attributes`);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`⚠️  Warnings: ${results.warnings}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log('='.repeat(50) + '\n');

    if (results.failed > 0) {
      console.log('💡 Fix the failed checks to improve SEO\n');
      process.exit(1);
    } else if (results.warnings > 0) {
      console.log('💡 Consider addressing warnings for optimal SEO\n');
    } else {
      console.log('🎉 All SEO checks passed!\n');
    }

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

checkSEO(url);
