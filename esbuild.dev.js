const esbuild = require('esbuild');

async function startBuild() {
  const context = await esbuild.context({
    entryPoints: ['./src/index.ts'],      // Main entry file
    bundle: true,                         // Bundle dependencies
    outfile: './dist/bundle.js',          // Output file
    platform: 'browser',                  // Target for browsers
    target: 'es6',                        // Compile to ES6
    sourcemap: true,                      // Enable source maps
    logLevel: 'info',                     // Log build information
  });

  // Start watch mode
  await context.watch();

  console.log('Watching for changes...');
}

startBuild().catch(() => process.exit(1));
