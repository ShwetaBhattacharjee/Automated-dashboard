import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// Update a specific work tracker item
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const updatedItem = await req.json();
    updatedItem.lastUpdated = new Date().toISOString().split("T")[0];

    // Remove _id to avoid attempting to update the immutable _id field
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

// Delete a specific work tracker item
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
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
