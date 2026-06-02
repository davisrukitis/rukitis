/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "rimirigamarathon.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "0.gravatar.com" },
      { protocol: "https", hostname: "1.gravatar.com" },
      { protocol: "https", hostname: "2.gravatar.com" },
      { protocol: "https", hostname: "balticbrands.eu" },
      { protocol: "https", hostname: "www.ropazi.lv" },
    ],
  },
}

export default nextConfig
