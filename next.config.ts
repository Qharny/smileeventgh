import type { NextConfig } from "next";

// GitHub Pages serves this project under /<repo-name>. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH (e.g. "/smileeventgh"); locally it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages (no Node server).
  output: "export",
  basePath,
  // Pages has no image optimizer, so serve the source images as-is.
  images: { unoptimized: true },
  // cacheComponents / partialPrefetching are off: Next can't combine partial
  // prerendering with `output: "export"`, and this one-page site doesn't need them.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
