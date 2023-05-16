const fs = require('fs');
const uncss = require('uncss');

// Read the HTML file
const html = fs.readFileSync('portals/google/index.html', 'utf8');

// Extract the CSS from the <style> tags in the HTML
const css = extractInlineCSS(html);

// Remove unused CSS using unCSS
uncss(html, { raw: css }, (error, cleanedCSS) => {
  if (error) {
    console.error('Error:', error);
  } else {
    // Write the cleaned CSS back to the file
    fs.writeFileSync('cleaned.css', cleanedCSS, 'utf8');
    console.log('Unused CSS definitions removed successfully.');
  }
});

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
