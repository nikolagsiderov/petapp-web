/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pawpaldevassets.blob.core.windows.net",
      "lh3.googleusercontent.com",
    ],
  },
  webpack: (config) => {
    config.resolve.alias["expo-secure-store"] = false;
    return config;
  },
};

export default nextConfig;
