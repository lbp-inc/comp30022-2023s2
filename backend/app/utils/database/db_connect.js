import mongoose from "mongoose";
import fs from "fs";
import yaml from "js-yaml";

const loadConfig = () => {
  try {
    const config = yaml.load(fs.readFileSync("config/database.yaml", "utf8"));
    return config;
  } catch (error) {
    console.error(`Error reading database config: ${error.message}`);
    process.exit(1);
  }
};

const connectDB = async () => {
  const config = loadConfig();

  try {
    const conn = await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

