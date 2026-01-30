import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { query, items } = await req.json();

    if (!items || items.length === 0) return NextResponse.json([]);

    // --- STRATEGY 1: Attempt AI Semantic Search ---
    try {
      // Use the stable 1.5 model which often has better rate limits than experimental ones
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });

      const context = items
        .map(
          (item: any) =>
            `ID: ${item.id} | Title: ${item.title} | Summary: ${item.summary || item.content.substring(0, 100)}`,
        )
        .join("\n");

      const prompt = `
        You are a semantic search engine.
        Query: "${query}"
        
        Below is a list of knowledge items. Find the items that are most relevant to the query based on meaning.
        
        Items:
        ${context}

        Return ONLY a JSON array of the matching IDs, sorted by relevance. Example: [12, 5, 3]
        If nothing is relevant, return [].
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const rankedIds = JSON.parse(cleanJson);

      // Reorder items based on AI ranking
      const sortedItems = rankedIds
        .map((id: number) => items.find((item: any) => item.id === id))
        .filter(Boolean);

      return NextResponse.json(sortedItems);
    } catch (aiError: any) {
      // --- STRATEGY 2: Fallback to Keyword Search ---
      console.warn(
        "⚠️ AI Rate Limited or Failed. Switching to Keyword Search.",
      );

      const q = query.toLowerCase();
      const filtered = items.filter(
        (item: any) =>
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.tags?.some((t: string) => t.toLowerCase().includes(q)),
      );

      // Return the keyword results instead of crashing
      return NextResponse.json(filtered);
    }
  } catch (error) {
    console.error("Critical Search Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
