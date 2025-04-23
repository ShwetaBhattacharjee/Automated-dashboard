import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT: Update a specific work tracker item
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const updatedItem = await req.json();
    updatedItem.lastUpdated = new Date().toISOString().split("T")[0];

    // Avoid updating _id field
    delete updatedItem._id;

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedItem }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove a specific work tracker item
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
