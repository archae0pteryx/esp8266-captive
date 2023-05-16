const fs = require('fs');
const PurgeCSS = require('purgecss').default;

// Read the HTML file containing the <style> tag
const html = fs.readFileSync('portals/google/index.html', 'utf8');

// Define the CSS file path and content
const cssFilePath = 'styles.css';
const css = fs.readFileSync(cssFilePath, 'utf8');

// Create a PurgeCSS configuration object
const purgeCSSConfig = {
  content: [{
    raw: html,
    extension: 'html',
  }],
  css: [{
    raw: css,
    extension: 'css',
  }],
  keyframes: false,
};

// Run PurgeCSS
const purgeCSSResult = new PurgeCSS().purge(purgeCSSConfig);

// Extract the cleaned CSS content
const cleanedCSS = purgeCSSResult[0].css;

// Write the cleaned CSS back to the file
fs.writeFileSync(cssFilePath, cleanedCSS, 'utf8');

console.log('Unused CSS definitions removed successfully.');
