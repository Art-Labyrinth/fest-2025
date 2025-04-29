const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const { pipeline } = require('stream');

// Read routes dynamically from src/index.js
const filePath = path.resolve(__dirname, '../src/index.js');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const ast = parse(fileContent, { sourceType: 'module', plugins: ['jsx'] });

const links = [];

// Traverse the AST to extract routes
traverse(ast, {
    JSXElement(path) {
        const openingElement = path.node.openingElement;
        if (openingElement.name.name === 'Route') {
            const pathAttr = openingElement.attributes.find(
                (attr) => attr.name.name === 'path'
            );
            if (pathAttr) {
                console.log('Opening Element:', pathAttr);
                links.push({
                    url: pathAttr.value.value,
                    changefreq: 'daily',
                    priority: pathAttr.value.value === '/' ? 1 : 0.8,
                });
            }
        }
    },
});

const sitemap = new SitemapStream({ hostname: 'https://fest.art-labyrinth.org/' });
const writeStream = createWriteStream(
    path.resolve(__dirname, '../public/sitemap.xml')
);

// Ensure proper handling of the sitemap stream
// Add hreflang and common image to each page
links.forEach((link) => {
    sitemap.write({
        url: link.url,
        changefreq: link.changefreq,
        priority: link.priority,
        links: [
            { lang: 'en', url: `https://fest.art-labyrinth.org${link.url}` },
            { lang: 'ru', url: `https://fest.art-labyrinth.org${link.url}` },
            { lang: 'ro', url: `https://fest.art-labyrinth.org${link.url}` },
        ],
        img: [
            {
                url: 'https://fest.art-labyrinth.org/image.png',
                caption: 'Art-Labyrinth Festival 2025 Five hands One Rhythm',
            },
        ],
    });
});
sitemap.end(); // Close the stream before piping it

// Use pipeline for better stream handling
pipeline(
    sitemap,
    writeStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed:', err);
        }
    }
);
