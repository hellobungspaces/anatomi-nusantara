import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Beranda adalah viewer 3D statis di public/anatomi. Rewrite menjaga alamatnya tetap "/"
  // sehingga hash (#joglo) langsung terbaca oleh viewer, tanpa iframe.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/anatomi/index.html" }],
    };
  },
};

export default nextConfig;
