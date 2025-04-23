// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://a3:rouge1234@cluster0.mjpaoju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

let client: MongoClient;

declare global {
  // Use let instead of var to avoid ESLint error
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Create the client and store the promise globally if not already defined
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

const finalClientPromise = global._mongoClientPromise!;

export default finalClientPromise;
