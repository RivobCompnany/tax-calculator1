/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enable static export on next build
  // optional: trailingSlash: true,
};

const repoName = "tax-calculator";
module.exports = {
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
