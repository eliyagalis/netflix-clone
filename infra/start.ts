import { exec } from "child_process";

const env = process.argv[2];

const file = env === "prod" ? "docker-compose-prod.yaml" : "docker-compose-dev.yaml";
console.log(`run the ENV: ${env} with file: ${file}`);

exec(`docker-compose -f ${file} up --build`, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ error", err.message);
    return;
  }
  console.log("success");
  console.log(stdout);
  if (stderr) 
    console.error(stderr);

});