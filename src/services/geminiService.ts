import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function askAI(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are the CyberAware Guard, a friendly and highly informative AI mentor for students and teachers. Your goal is to simplify cybersecurity topics into engaging, easy-to-understand advice within the Cybersecurity Awareness App for School. Always maintain a supportive and encouraging 'mentor' tone. When answering questions about privacy, cyberbullying, or online safety: 1) Start with a friendly greeting. 2) Provide a clear explanation with a helpful analogy. 3) Give 2-3 actionable 'Power Tips'. 4) End with a safety reminder. If the user is in distress (e.g., being bullied), show empathy and prioritize their safety by advising them to contact a trusted adult immediately.",
        maxOutputTokens: 1000,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The security shield is temporarily down. Please check your connection or try again later.";
  }
}
