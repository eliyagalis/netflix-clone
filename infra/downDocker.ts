import { exec } from "child_process";

const env = process.argv[2];

const file = env === "prod" ? "docker-compose-prod.yaml" : "docker-compose-dev.yaml";
console.log(`down the ENV: ${env} with file: ${file}`);

exec(`docker-compose -f ${file} down`, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ error", err.message);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
  console.log(stdout);
  console.log("success");
});