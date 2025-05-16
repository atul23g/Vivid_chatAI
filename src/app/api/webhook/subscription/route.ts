import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const buyerUserId = body?.meta?.custom_data?.buyerUserId;
    if (!buyerUserId || typeof buyerUserId !== "string") {
      return NextResponse.json(
        { message: "Invalid buyerUserId or ID does not exist" },
        { status: 400 }
      );
    }

    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
    );

    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "hex");
    const signatureHeader = req.headers.get("X-Signature") || "";
    const signature = Buffer.from(signatureHeader, "hex");

    if (
      signature.length !== digest.length ||
      !crypto.timingSafeEqual(digest, signature)
    ) {
      return NextResponse.json(
        { message: "Invalid signature." },
        { status: 401 }
      );
    }

    const buyer = await client.user.update({
      where: { id: buyerUserId },
      data: { subscription: true },
    });

    if (!buyer) {
      return NextResponse.json(
        { message: "Cannot update the subscription" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: buyer }, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
