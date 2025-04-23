import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT: Update a specific work tracker item
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extracts the [id] from the URL

    const updatedItem = await req.json();
    updatedItem.lastUpdated = new Date().toISOString().split("T")[0];

    delete updatedItem._id; // Avoid updating _id

    const result = await collection.updateOne(
      { _id: new ObjectId(id!) },
      { $set: updatedItem }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove a specific work tracker item
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const result = await collection.deleteOne({ _id: new ObjectId(id!) });

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
