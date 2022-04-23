const fs = require("fs");
const domain = "https://gpc.edafter.com";
let data = JSON.parse(fs.readFileSync("src/data.json", "utf-8"));

const defaultPages = `
<url>
<loc>${domain}/login</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/signin</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/tools</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/refund-policy</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/tools/make-in-india</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/tools/reseller-authority-letter</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
<url>
<loc>${domain}/tools/bidder-financial-standing</loc>
<lastmod>2022-01-24T17:48:29.837Z</lastmod>
</url>
`;

const generatedData = data
  .map((data) => {
    let slug = `/${data.slug}`;
    if (data.slug == "/") {
      slug = "";
    }
    return `<url>
    <loc>${domain}${slug}</loc>
    <lastmod>${data.created}</lastmod>
  </url>`;
  })
  .join(" ");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${defaultPages}
${generatedData}
</urlset>`;

const pathOfDataFile = "public/sitemap.xml";
//write file
fs.writeFileSync(pathOfDataFile, sitemap);

console.log("Sitemap Generated");
