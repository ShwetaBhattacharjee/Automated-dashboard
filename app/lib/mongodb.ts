import { MongoClient } from "mongodb";

// Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient;

// Fix global type for Node.js to avoid ESLint error
declare global {
  const _mongoClientPromise: Promise<MongoClient> | undefined;
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local or Vercel environment variables");
}

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });
}

const finalClientPromise = globalWithMongo._mongoClientPromise;

export default finalClientPromise;