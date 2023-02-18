/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    OPEN_API_TOKEN: process.env.OPEN_API_TOKEN,
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
  },
};
