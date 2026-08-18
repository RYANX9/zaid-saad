import { NextRequest, NextResponse } from "next/server";
import { commitFile } from "../../lib/github";

export async function POST(req: NextRequest) {
  try {
    const { filename, content, projectId } = await req.json();

    if (!filename || !content) {
      return NextResponse.json(
        { ok: false, error: "Missing filename or content" },
        { status: 400 }
      );
    }

    const ext =
      filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    const safeId = String(projectId || "project").replace(/[^a-z0-9-]/gi, "");
    const targetName = `${safeId}-${Date.now()}.${ext}`;

    await commitFile(
      `public/projects/${targetName}`,
      content,
      `Upload project image: ${targetName}`,
      true
    );

    return NextResponse.json({ ok: true, path: `/projects/${targetName}` });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
