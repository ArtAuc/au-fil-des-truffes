import { HtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";

// Photos : redimensionnées et converties (WebP + JPEG de secours) au build.
async function image(src, alt, sizes = "100vw", className = "", loading = "lazy") {
  const metadata = await Image(`src/images/${src}`, {
    widths: [400, 800, 1200, 1600, 2400],
    formats: ["webp", "jpeg"],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpWebpOptions: { quality: 85 },
    sharpJpegOptions: { quality: 85, progressive: true },
  });
  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading,
    decoding: "async",
    ...(className && { class: className }),
  });
}

// 13 → « 13 € », 0 → « Offert », null → « Sur devis »
function prix(value) {
  if (value === null || value === undefined) return "Sur devis";
  if (value === 0) return "Offert";
  const montant = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(".", ",");
  return `${montant} €`;
}

export default function (eleventyConfig) {
  // Le préfixe (/au-fil-des-truffes/) n'est utile que sur artauc.github.io, avant le domaine.
  eleventyConfig.addPlugin(HtmlBasePlugin);
  // Adresse publique, pour les liens absolus (canonical, Open Graph, sitemap). Fournie par le workflow.
  eleventyConfig.addGlobalData("siteUrl", process.env.SITE_URL || "http://localhost:8080");

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/og-image.jpeg");
  eleventyConfig.addPassthroughCopy("src/documents");

  eleventyConfig.addShortcode("image", image);
  eleventyConfig.addFilter("prix", prix);
  eleventyConfig.addFilter("min", (values) => Math.min(...values));
  eleventyConfig.addFilter("pluck", (items, key) => items.map((item) => item[key]));

  return {
    dir: { input: "src" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
