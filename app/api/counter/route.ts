import { createCounters, getAllCounters, updateCounter } from "@/lib/dbMethods";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const numCountersStr = await req.text();
  const numCounters = parseInt(numCountersStr);

  try {
    await createCounters(numCounters);
    return NextResponse.json({ message: "Successfully initialized counters" });
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while initializing counters" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const counters = await getAllCounters();
    const countersJSON = [];
    for (const counter of counters) {
      countersJSON.push(counter.toJSON({ flattenObjectIds: true }));
    }
    return NextResponse.json({
      message: "Successfully fetched all counters",
      data: countersJSON,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while fetching counters" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, update }: { id: string; update: Record<string, any> } = body;

  try {
    await updateCounter(id, update);
    return NextResponse.json({ message: "Successfully updated counter" });
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while updating counter" },
      { status: 500 }
    );
  }
}
