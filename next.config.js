/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,

  experimental: {
    serverComponents: true, // enable experimental server components
    serverComponentsMiddleware: true, // enable middleware for server components
  },
};
