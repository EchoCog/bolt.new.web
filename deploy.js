const { execSync } = require('child_process');

const target = process.argv[2] === '--target=gcloud' ? 'gcloud' : 'cloudflare';

if (target === 'gcloud') {
  console.log('Deploying to Google Cloud...');
  try {
    execSync(`gcloud builds submit --config cloudbuild.yaml`, { stdio: 'inherit' });
    console.log('Deployed successfully to Google Cloud');
  } catch (error) {
    console.error(`Error deploying to Google Cloud: ${error}`);
  }
} else {
  console.log('Deploying to Cloudflare...');
  try {
    execSync(`wrangler deploy`, { stdio: 'inherit' });
    console.log('Deployed successfully to Cloudflare');
  } catch (error) {
    console.error(`Error deploying to Cloudflare: ${error}`);
  }
}