/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'computer-web.onrender.com']
    }
  },
  images: {
    // 避免為了外部圖片白名單而卡住，先不做最佳化
    unoptimized: true
  }
};

export default nextConfig;

