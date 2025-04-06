import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userBuf = Buffer.from(username, "base64");
    const passBuf = Buffer.from(password, "base64");

    const shaUser = crypto.createHash("sha1").update(userBuf).digest("hex");
    const shaPass = crypto.createHash("sha1").update(passBuf).digest("hex");

    if (shaUser === shaPass && !userBuf.equals(passBuf)) {
      return NextResponse.json(
        {
          message: `${process.env.FLAG}`,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: "Login failed" }, { status: 403 });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 },
    );
  }
}
