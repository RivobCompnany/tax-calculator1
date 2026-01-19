/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/tax-calculator1",
  trailingSlash: true,
};

module.exports = nextConfig;
