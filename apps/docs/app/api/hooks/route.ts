import { NextRequest, NextResponse } from "next/server";
import { getClientIp, type Hook } from "@rehooks/utils";
import { ratelimit } from "@/lib/redis/ratelimit";
import { join } from "path";
import { readFile } from "fs";

export const dynamic = "force-dynamic";

const filePath = join(process.cwd(), "lib", "hooks.json");

async function loadData(): Promise<Hook[]> {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error loading data:", err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export async function GET(req: NextRequest) {
  const clientIp = await getClientIp();
  const identifier = clientIp;
  const rateLimitResult = await ratelimit.limit(identifier);

  NextResponse.next().headers.set(
    "X-RateLimit-Limit",
    rateLimitResult.limit.toString(),
  );
  NextResponse.next().headers.set(
    "X-RateLimit-Remaining",
    rateLimitResult.remaining.toString(),
  );

  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    const search = url.searchParams.get("search");
    const data: Hook[] = await loadData();
    let result = data;
    if (search) {
      result = data.filter((hook) =>
        hook.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (limit) {
      const parsedLimit = Number(limit);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        return NextResponse.json(
          { error: "Invalid limit. It must be a positive number." },
          { status: 400 },
        );
      }
      result = result.slice(0, parsedLimit);
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Ratelimit exceeded. Please try again in a few seconds." },
        { status: 429 },
      );
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
