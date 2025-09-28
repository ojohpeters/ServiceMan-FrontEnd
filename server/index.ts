// Simple frontend-only server - just run Vite dev server directly
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[server] starting frontend-only mode');
console.log('[server] API calls should go to Django backend at VITE_API_URL');

// Run Vite from root directory with config file
const viteProcess = exec('npx vite --config vite.config.ts --host 0.0.0.0 --port 5000', {
  cwd: path.join(__dirname, '..')
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Vite: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});

viteProcess.stdout?.on('data', (data) => {
  console.log(data.toString());
});

viteProcess.stderr?.on('data', (data) => {
  console.error(data.toString());
});

process.on('SIGINT', () => {
  console.log('\n[server] shutting down...');
  viteProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n[server] shutting down...');
  viteProcess.kill();
  process.exit(0);
});