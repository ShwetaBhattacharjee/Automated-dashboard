import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

const getFormattedDate = () => new Date().toISOString().split("T")[0];

function getIdFromUrl(url: string): string | null {
  try {
    return new URL(url).pathname.split("/").pop() || null;
  } catch {
    return null;
  }
}

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const id = getIdFromUrl(req.url);
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const updatedItem = await req.json();
    updatedItem.lastUpdated = getFormattedDate();
    delete updatedItem._id;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedItem }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard");
    const collection = db.collection("worktracker");

    const id = getIdFromUrl(req.url);
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
