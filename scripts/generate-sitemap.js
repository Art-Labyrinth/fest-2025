const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const links = [
    { url: '/',            changefreq: 'daily',    priority: 1.0 },
    { url: '/contact/',    changefreq: 'weekly',   priority: 0.9 },

    { url: '/about/',      changefreq: 'monthly',  priority: 0.5 },
    { url: '/gallery/',    changefreq: 'monthly',  priority: 0.5 },
    { url: '/contribute/', changefreq: 'monthly',  priority: 0.5 },
];


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
