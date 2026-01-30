import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/* GET all knowledge items */
export async function GET() {
  const { data, error } = await supabase
    .from("knowledge_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

/* POST: Create item + Generate AI Summary/Tags */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ ADDED: sourceUrl
    const { title, content, type, sourceUrl } = body;

    // 1. Prepare AI Prompt
    let summary = "";
    let tags: string[] = [];

    if (content) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-flash-latest",
        });

        const prompt = `
Analyze the following text.

1. Write a short summary. Start it with "⚡ Insight: ".
2. Extract 3 relevant keywords/tags.


Return the output strictly as a JSON object:
{
  "summary": "...",
  "tags": ["tag1", "tag2", "tag3"],
  
}

Text to analyze:
"${content}"
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if Gemini sends them
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const aiData = JSON.parse(cleanJson);

        summary = aiData.summary;
        tags = aiData.tags;
      } catch (aiError) {
        console.error("Gemini AI Error:", aiError);
        summary = "Summary unavailable";
        tags = ["manual"];
      }
    }

    // 2. Insert into Supabase with AI data
    const { data, error } = await supabase
      .from("knowledge_items")
      .insert([
        {
          title,
          content,
          type,
          summary,
          tags,

          // ✅ ADDED: sourceUrl (snake_case if your DB uses it)
          // If column name is camelCase:
          sourceUrl: sourceUrl || null,

          // If column name is snake_case, use instead:
          // source_url: sourceUrl || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
