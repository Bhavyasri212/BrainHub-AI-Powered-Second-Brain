import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    // ✅ 1. Receive 'messages' array instead of single 'message'
    const { messages } = await req.json();

    // 2. Fetch Knowledge Context
    // We increased limit to 50 to ensure we catch older notes for better context
    const { data: notes, error } = await supabase
      .from("knowledge_items")
      .select("title, content, type, tags, summary, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const contextText = notes
      ?.map(
        (note) =>
          `[Date: ${new Date(note.created_at).toLocaleDateString()}]\nTitle: ${note.title}\nType: ${note.type}\nTags: ${note.tags}\nContent: ${note.content}\nSummary: ${note.summary}\n---`,
      )
      .join("\n");

    // ✅ 3. Format Conversation History
    // We take all messages EXCEPT the last one (which is the new question) to form history
    const historyText = messages
      .slice(0, -1)
      .map(
        (m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
      )
      .join("\n");

    const lastMessage = messages[messages.length - 1].content;

    // ✅ 4. Construct System Prompt with History
    const systemPrompt = `
      You are 'BrainHub', the user's personal second brain.
      
      RULES:
      1. Use the "Knowledge Base" section to answer questions.
      2. Use the "Conversation History" to understand context (e.g., if user says "that note").
      3. If the answer is found, cite the title.
      4. Be concise and helpful.

      === KNOWLEDGE BASE ===
      ${contextText}

      === CONVERSATION HISTORY ===
      ${historyText}

      === CURRENT QUESTION ===
      ${lastMessage}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();

    return NextResponse.json({ reply: response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process thought." },
      { status: 500 },
    );
  }
}
