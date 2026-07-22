import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askAI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "google/gemma-4-26b-a4b:free",
        messages: [
          {
            role: "system",
            content:
              "You are Lexxie MiaBot, a friendly and helpful Telegram assistant created by @mr_alex_dem.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data.choices?.[0]?.message?.content || "No response from AI.";
  } catch (error: any) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    return "❌ AI is currently unavailable.";
  }
}
