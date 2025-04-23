import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    console.time("GET /api/tracker");
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const items = await collection.find().toArray();
    console.timeEnd("GET /api/tracker");
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("GET /api/tracker error:", error.message);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.time("POST /api/tracker");
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const newItem = await req.json();
    // Basic validation
    if (!newItem.unit || !newItem.task || !newItem.assignedTo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    newItem.lastUpdated = new Date().toISOString().split("T")[0];
    const result = await collection.insertOne(newItem);

    console.timeEnd("POST /api/tracker");
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/tracker error:", error.message);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    console.time("PUT /api/tracker");
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const { _id, ...updateData } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    updateData.lastUpdated = new Date().toISOString().split("T")[0];
    const result = await collection.updateOne(
      { _id: new mongodb.ObjectId(_id) },
      { $set: updateData }
    );

    console.timeEnd("PUT /api/tracker");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("PUT /api/tracker error:", error.message);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.time("DELETE /api/tracker");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const result = await collection.deleteOne({ _id: new mongodb.ObjectId(id) });

    console.timeEnd("DELETE /api/tracker");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("DELETE /api/tracker error:", error.message);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}