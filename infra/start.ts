import { exec } from "child_process";

const env = process.argv[2];

const file = env === "prod" ? "docker-compose.prod.yml" : "docker-compose.dev.yml";
console.log(`🚀 מריץ את הסביבה: ${env} עם הקובץ ${file}`);

exec(`docker-compose -f ${file} up --build`, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ שגיאה:", err.message);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});