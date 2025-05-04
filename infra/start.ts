import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const env = process.argv[2];
const file = env === "prod" ? "docker-compose-prod.yaml" : "docker-compose-dev.yaml";

async function start() {
  console.log(`run the ENV: ${env} with file: ${file}`);
  
  try {
    // Start containers in detached mode
    console.log('🚀 Starting containers...');
    await execAsync(`docker-compose -f infra/${file} up -d --build`);
    
    // Wait for services to be ready
    console.log('⏳ Waiting for services to be ready...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Initialize Kafka topics
    console.log('🔧 Initializing Kafka topics...');
    await execAsync('npx ts-node infra/kafka-setup/admin.ts');
    
    console.log('✅ All services started successfully!');
    
    // Attach to logs
    exec(`docker-compose -f infra/${file} logs -f`, (err, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      if (err) console.error(err);
    });
    
  } catch (error) {
    console.error('❌ Error during startup:', error);
    process.exit(1);
  }
}

start();