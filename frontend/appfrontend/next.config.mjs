/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'imgix', // Choose your preferred loader
    path: 'https://*.serveo.net/', // Replace with your serveo.net backend URL
    // path : 'http://127.0.0.1:8000/',
    // change the path to http://127.0.0.1:8000/ if you are using a local Django server
  },

};

export default nextConfig;
