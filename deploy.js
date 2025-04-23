const { execSync } = require('child_process');
const fs = require('fs');

const target = process.argv.includes('--target=gcloud') ? 'gcloud' : 'cloudflare';

const integrationsPath = '.idx/integrations.json';
const cloudbuildPath = 'cloudbuild.yaml';

let projectId = '';
let region = '';

if (fs.existsSync(integrationsPath)) {
    const integrationsData = JSON.parse(fs.readFileSync(integrationsPath, 'utf-8'));
    projectId = process.argv.includes('--project-id') ? process.argv[process.argv.indexOf('--project-id') + 1] : integrationsData.cloud_run_deploy.config.projectId;
    region = process.argv.includes('--region') ? process.argv[process.argv.indexOf('--region') + 1] : integrationsData.cloud_run_deploy.config.region;
}

if (!projectId || !region){
    console.error("Error: projectId and region are needed");
    process.exit(1);
}

if (fs.existsSync(cloudbuildPath)){
    let cloudbuildData = fs.readFileSync(cloudbuildPath, 'utf-8');
    cloudbuildData = cloudbuildData.replace(/\$PROJECT_ID/g, projectId);
    cloudbuildData = cloudbuildData.replace(/us-central1/g, region);
    fs.writeFileSync(cloudbuildPath, cloudbuildData);
}

if (target === 'gcloud') {
  console.log('Deploying to Google Cloud...');
  try {
    execSync(`gcloud builds submit --config cloudbuild.yaml`, { stdio: 'inherit' });
    console.log('Deployed successfully to Google Cloud');
  } catch (error) {
    console.error(`Error deploying to Google Cloud:`);
    if (error.stderr) {
      console.error(error.stderr.toString());
    }
    if (error.stdout){
        console.log(error.stdout.toString())
    }
    process.exit(1);
  }
} else {
  console.log('Deploying to Cloudflare...');
  try {
    execSync(`pnpm wrangler deploy`, { stdio: 'inherit'});
    console.log('Deployed successfully to Cloudflare');
  } catch (error) {
    console.error(`Error deploying to Cloudflare:`);
    console.error(error.stderr.toString())
    process.exit(1);
  }
}
