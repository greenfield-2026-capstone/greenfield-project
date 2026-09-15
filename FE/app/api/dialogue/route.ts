import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Dialogue API is not configured yet." },
    { status: 501 }
  );
}
