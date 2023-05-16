const fs = require('fs');
const purify = require('purify-css');

// Read the HTML file
const html = fs.readFileSync('portals/google/index.html', 'utf8');

// Extract the CSS from the <style> tags in the HTML
const css = extractInlineCSS(html);

// Purify CSS to remove unused definitions, inline styles, and duplicates
const purifiedCSS = purify(html, css, {
  minify: false,     // Optionally minify the output CSS
  rejected: true,   // Include rejected selectors in the output
});

// Write the purified CSS back to the file
fs.writeFileSync('cleaned.css', purifiedCSS, 'utf8');
console.log('Unused CSS definitions, inline styles, and duplicates removed successfully.');

// Function to extract CSS from <style> tags in HTML
function extractInlineCSS(html) {
  const styleRegex = /<style[^>]*>([^<]*)<\/style>/g;
  const matches = html.match(styleRegex);

  if (!matches) {
    return '';
  }

  // Extract the CSS content from <style> tags
  const css = matches.map((match) => {
    const cssRegex = /<style[^>]*>([^<]*)<\/style>/;
    const cssMatch = match.match(cssRegex);
    return cssMatch[1];
  });

  return css.join('\n');
}

const postcss = require('postcss');
const cssnano = require('cssnano');

// Read the CSS file
const cssn = fs.readFileSync('cleaned.css', 'utf8');

// Optimize and remove unnecessary CSS using cssnano
postcss([cssnano])
  .process(cssn, { from: 'cleaned.css', to: 'optimized.css' })
  .then((result) => {
    fs.writeFileSync('optimized.css', result.css, 'utf8');
    console.log('CSS optimized successfully.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
