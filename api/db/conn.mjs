import { MongoClient } from "mongodb";

const connectionString = process.env.DB_URI || "";

const client = new MongoClient("mongodb://lbp-app:team107@20.211.195.91/lbp?retryWrites=true&w=majority");

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db();

export default db;