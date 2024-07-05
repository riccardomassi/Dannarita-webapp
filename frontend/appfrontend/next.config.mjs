/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dannarita-backend.serveo.net',
        // change the path to protocol and hostname if you are using a local Django server
        // protocol: 'http',
        // hostname: '127.0.0.1',
      }
    ],
  },
};

export default nextConfig;
