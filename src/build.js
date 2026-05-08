#!/usr/bin/env node

/**
 * BoomHaus Website Build Script
 * Generates all 28 HTML pages from EJS templates and JSON data
 * 
 * Usage: npm run build
 * 
 * This script:
 * 1. Reads data from /src/data/pages.json
 * 2. Renders EJS templates from /src/templates/
 * 3. Includes partials from /src/partials/
 * 4. Outputs HTML files to /public/
 * 
 * Future: Can be easily adapted to pull data from Sanity CMS API
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Paths
const SRC_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(SRC_DIR, 'src/templates');
const PARTIALS_DIR = path.join(SRC_DIR, 'src/partials');
const DATA_DIR = path.join(SRC_DIR, 'src/data');
const PUBLIC_DIR = path.join(SRC_DIR, 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Load all data
const pagesData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pages.json'), 'utf8'));
const siteConfig = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site-config.json'), 'utf8'));

console.log('\n🏗️  Building BoomHaus Website...\n');

let successCount = 0;
let errorCount = 0;

// Process each page
Object.entries(pagesData.pages).forEach(([pageKey, pageData]) => {
  try {
    // Determine which template to use based on page type
    const templateName = pageData.template || 'landing-page.ejs';
    const templatePath = path.join(TEMPLATES_DIR, templateName);
    
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templateName}`);
    }
    
    // Read template
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Prepare data for EJS
    const renderData = {
      page: pageData,
      site: siteConfig,
      filename: templatePath // Required for EJS relative paths
    };
    
    // Render template
    const html = ejs.render(templateContent, renderData, {
      filename: templatePath
    });
    
    // Write to public directory
    const outputPath = path.join(PUBLIC_DIR, pageData.filename || `${pageKey}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    
    console.log(`✅ ${pageData.filename || `${pageKey}.html`}`);
    successCount++;
    
  } catch (error) {
    console.log(`❌ ${pageKey}: ${error.message}`);
    errorCount++;
  }
});

console.log(`\n📊 Build Summary:`);
console.log(`   ✅ Success: ${successCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log(`\n✨ Files generated in: /public/\n`);

if (errorCount > 0) {
  process.exit(1);
}
