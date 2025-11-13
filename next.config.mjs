/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER: process.env.SERVER,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        // S3URL: process.env.S3URL,
      },
      images: {
        domains: ["res.cloudinary.com"],
      }
};

export default nextConfig;
