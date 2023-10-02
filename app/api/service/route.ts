import { getServiceWhere } from "@/lib/dbMethods";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const serviceName = await req.text();

  try {
    const service = await getServiceWhere({
      name: { en: decodeURIComponent(serviceName) },
    });

    return NextResponse.json({
      message: "Successfully fetched service",
      data: service?.toJSON({ flattenObjectIds: true }),
    });
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while fetching service" },
      { status: 500 }
    );
  }
}
