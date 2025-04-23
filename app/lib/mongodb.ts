// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://a3:rouge1234@cluster0.mjpaoju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

const client: MongoClient;

declare global {
  const _mongoClientPromise: Promise<MongoClient> | undefined;  // Replaced `let` with `const`
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

const finalClientPromise = global._mongoClientPromise!;

export default finalClientPromise;
