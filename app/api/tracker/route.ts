import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

const getFormattedDate = () => new Date().toISOString().split("T")[0];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const items = await collection.find().toArray();
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const newItem = await req.json();
    newItem.lastUpdated = getFormattedDate();

    const result = await collection.insertOne(newItem);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
