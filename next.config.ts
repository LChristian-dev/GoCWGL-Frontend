import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Modern Dart Sass API option (the legacy `includePaths` is ignored by
    // the loader here) — lets any `*.module.scss` file `@use "abstracts/..."`
    // without a relative path back to `src/styles`.
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
