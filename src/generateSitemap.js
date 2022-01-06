const fs = require('fs')
const domain = "https://gemportal.vercel.app";
let data = JSON.parse(fs.readFileSync('src/data.json', 'utf-8'))

const generatedData = data.map(data => {
    return (
        `<url>
    <loc>${domain}/${data.slug}</loc>
    <lastmod>${data.created}</lastmod>
  </url>`
    )

});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generatedData}
</urlset>`;

const pathOfDataFile = "public/sitemap.xml";
//write file
fs.writeFileSync(pathOfDataFile, sitemap);

console.log("Sitemap Generated");