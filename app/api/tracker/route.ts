import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("dashboard");
  const collection = db.collection("worktracker");

  const items = await collection.find().toArray();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("dashboard");
  const collection = db.collection("worktracker");

  const newItem = await req.json();
  newItem.lastUpdated = new Date().toISOString().split("T")[0];

  const result = await collection.insertOne(newItem);
  return NextResponse.json(result, { status: 201 });
}
