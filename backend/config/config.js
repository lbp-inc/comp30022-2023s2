import fs from "fs";
import yaml from "js-yaml";

const loadConfig = () => {
  try {
    const file = fs.readFileSync("config/database.yaml", "utf8");
    return yaml.load(file);
  } catch (error) {
    console.error(`Error reading database config: ${error.message}`);
    process.exit(1);
  }
};

const config = loadConfig();

export default config;
