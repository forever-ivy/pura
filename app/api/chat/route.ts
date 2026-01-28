import { GoogleGenAI } from "@google/genai";

type ChatRequest = {
  input?: string;
  model?: string;
};

const DEFAULT_MODEL = "gemini-3-flash-preview";
const DEFAULT_INPUT = "Explain how AI works in a few words.";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Missing GEMINI_API_KEY in environment." },
      { status: 500 },
    );
  }

  let body: ChatRequest = {};
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    body = {};
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: body.model ?? DEFAULT_MODEL,
    contents: body.input ?? DEFAULT_INPUT,
  });

  return Response.json({ text: response.text });
}
