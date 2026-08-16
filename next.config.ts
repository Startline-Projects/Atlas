import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next only serves its client runtime (/_next/*) to these hosts in dev; any
  // other origin gets plain HTML that never hydrates, so forms fall back to a
  // native GET submit. Cover localhost, the workspace-preview bridge, and the
  // usual private LAN ranges so the app can be opened from a phone / another
  // machine on the same network. Wildcards match one dot-separated segment.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "169.254.38.210",
    "192.168.*.*",
    "10.*.*.*",
  ],
};

export default nextConfig;
