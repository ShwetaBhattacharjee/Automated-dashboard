// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://a3:rouge1234@cluster0.mjpaoju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

let client: MongoClient;

// Fix global type for Node.js to avoid ESLint error
declare global {
  // Must match the actual `globalThis` object
  // NOT using "var" here avoids the error
  const _mongoClientPromise: Promise<MongoClient> | undefined;
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect();
}

const finalClientPromise = globalWithMongo._mongoClientPromise!;

export default finalClientPromise;
