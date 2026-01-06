import { NextResponse } from "next/server";

const API_KEY = process.env.FINNHUB_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbols = searchParams.get("symbols");

  if (!symbols) {
    return NextResponse.json({ prices: {} });
  }

  try {
    const prices: Record<string, any> = {};
    const list = symbols.split(",");

    await Promise.all(
      list.map(async (symbol) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`,
          { cache: "no-store" }
        );

        const q = await res.json();

        prices[symbol] = {
          price: q.c,
          percent: q.dp,
        };
      })
    );

    return NextResponse.json({ prices });
  } catch (e) {
    console.error("Finnhub error", e);
    return NextResponse.json({ prices: {} });
  }
}
