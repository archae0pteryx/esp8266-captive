const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read the HTML file
const html = fs.readFileSync('portals/google/index.html', 'utf8');

// Create a DOM object from the HTML
const dom = new JSDOM(html);
const { document } = dom.window;

// Get the body element
const body = document.querySelector('body');

// Get all elements within the body
const elements = body.getElementsByTagName('*');

// Loop through each element
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];

  // Get all attributes of the current element
  const attributes = element.attributes;

  // Loop through each attribute
  for (let j = attributes.length - 1; j >= 0; j--) {
    const attribute = attributes[j];

    // Check if the attribute is neither class nor id
    if (attribute.name !== 'class' && attribute.name !== 'id') {
      // Remove the attribute from the element
      element.removeAttribute(attribute.name);
    }
  }
}

// Get the cleaned HTML
const cleanedHTML = document.documentElement.outerHTML;

// Write the cleaned HTML to an output file
fs.writeFileSync('output.html', cleanedHTML, 'utf8');
