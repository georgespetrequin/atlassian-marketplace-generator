const fs = require('fs');
const path = require('path');

// Read the template file
const envConfigTemplate = fs.readFileSync(
  path.resolve(__dirname, '../public/env-config.js'),
  'utf8'
);

// Replace placeholders with actual environment variables
const envConfigContent = envConfigTemplate
  .replace('__REACT_APP_SUPABASE_URL__', process.env.REACT_APP_SUPABASE_URL || '')
  .replace('__REACT_APP_SUPABASE_ANON_KEY__', process.env.REACT_APP_SUPABASE_ANON_KEY || '');

// Ensure the build directory exists
const buildDir = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Write the config file to the build directory
fs.writeFileSync(
  path.resolve(buildDir, 'env-config.js'),
  envConfigContent,
  'utf8'
);

console.log('✅ Environment configuration generated successfully'); 