/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VERCEL ? {} : { output: 'export' }),
};

module.exports = nextConfig;
