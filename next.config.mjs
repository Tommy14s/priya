/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/api/bookings/create-checkout": ["./src/generated/prisma/**/*"],
    "/api/stripe/webhook": ["./src/generated/prisma/**/*"],
    "/owner/dashboard": ["./src/generated/prisma/**/*"],
    "/booking/success": ["./src/generated/prisma/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
