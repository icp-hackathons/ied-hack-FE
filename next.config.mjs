/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "chart.googleapis.com"],
  },
  output: "export",
};

export default nextConfig;
