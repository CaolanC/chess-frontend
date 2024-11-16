const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'],      // Main entry file
  bundle: true,                         // Bundle all dependencies
  outfile: './public/js/bundle.js',          // Output bundled file
  platform: 'browser',                  // Target browser environment
  target: 'es6',                        // Compile to ES6
  sourcemap: true,                      // Enable source maps (optional)
  logLevel: 'info',                     // Log build information
}).catch(() => process.exit(1));
