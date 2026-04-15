/**
 * POST /api/ocr-vision
 *
 * Body: { image: "data:image/<fmt>;base64,<...>" }
 * Headers: X-OCR-Secret: <shared secret>  (Phase 1 auth stopgap)
 *
 * Calls Anthropic Claude Haiku vision model to extract roulette numbers
 * from a scoreboard photo. Returns { numbers: number[] } in the order
 * they appear on the board (top-to-bottom).
 *
 * Phase 2 will replace the shared-secret header with Supabase auth +
 * per-user Pro-tier quota enforcement.
 */
import { NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";

const OCR_PROMPT = `You are reading a casino roulette scoreboard photo.

The board shows a list of roulette numbers (each is 0, 00, or 1-36). They are stacked in a column.

Extract EVERY number you see, IN THE ORDER THEY APPEAR from top to bottom.

Return ONLY a JSON object in this exact format, with no other text:
{"numbers": [<n1>, <n2>, ...]}

Rules:
- Each entry must be an integer 0-36.
- If the board shows "00" (double zero), represent it as 0 (the app treats single/double zero the same).
- Do not include anything other than the numbers in the list.
- If you cannot read a number clearly, skip it rather than guessing.
- If the photo has no visible roulette numbers, return {"numbers": []}.`;

export async function POST(request: Request) {
  try {
    // Phase 1 auth: shared secret. Phase 2 will use Supabase session.
    const provided = request.headers.get("x-ocr-secret");
    const expected = process.env.OCR_SHARED_SECRET;
    if (!expected) {
      return NextResponse.json(
        { error: "Server misconfigured (missing OCR_SHARED_SECRET)" },
        { status: 500 }
      );
    }
    if (!provided || provided !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfigured (missing ANTHROPIC_API_KEY)" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const dataUrl: string | undefined = body?.image;
    if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
      return NextResponse.json(
        { error: "Missing or invalid 'image' (expected data: URL)" },
        { status: 400 }
      );
    }

    // Parse the data URL: data:<media>;base64,<payload>
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Image must be a base64 data URL" },
        { status: 400 }
      );
    }
    const mediaType = match[1];
    const base64 = match[2];

    // Guardrail: cap image size to avoid runaway costs.
    // 5MB base64 ≈ 3.75MB raw, plenty for a cropped scoreboard.
    const MAX_BASE64_BYTES = 5 * 1024 * 1024;
    if (base64.length > MAX_BASE64_BYTES) {
      return NextResponse.json(
        { error: "Image too large (max ~5MB base64)" },
        { status: 413 }
      );
    }

    const anthropicBody = {
      model: MODEL,
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            { type: "text", text: OCR_PROMPT },
          ],
        },
      ],
    };

    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(anthropicBody),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("[ocr-vision] Anthropic error:", anthropicRes.status, errText);
      return NextResponse.json(
        { error: "Vision API error", status: anthropicRes.status },
        { status: 502 }
      );
    }

    const data = await anthropicRes.json();
    const text: string =
      data?.content?.[0]?.type === "text" ? data.content[0].text : "";

    // Parse the numbers out of the model's JSON response. Be permissive in
    // case the model wraps it in markdown or adds whitespace.
    let numbers: number[] = [];
    try {
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
        if (Array.isArray(parsed?.numbers)) {
          numbers = parsed.numbers
            .map((n: unknown) => {
              const v = typeof n === "number" ? n : parseInt(String(n), 10);
              return Number.isFinite(v) ? v : NaN;
            })
            .filter((n: number) => n >= 0 && n <= 36);
        }
      }
    } catch (e) {
      console.warn("[ocr-vision] parse failed", e, "raw:", text);
    }

    // Include usage for cost tracking (so Kenny can see per-call token counts).
    return NextResponse.json({
      numbers,
      usage: data?.usage ?? null,
      model: MODEL,
    });
  } catch (err: unknown) {
    console.error("[ocr-vision] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
