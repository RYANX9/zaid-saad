import { NextRequest, NextResponse } from "next/server";
import { commitFile } from "../../lib/github";
import { generateDataFile } from "../../lib/generateDataFile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fileContent = generateDataFile(body);

    await commitFile(
      "app/data.ts",
      fileContent,
      "Update site content via admin dashboard"
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 }
    );
  }
}
