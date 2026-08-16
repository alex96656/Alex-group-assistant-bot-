const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free",
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
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("OpenRouter Error:", data);
    throw new Error(
      data?.error?.message || `OpenRouter HTTP ${response.status}`
    );
  }

  const reply = data?.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error("OpenRouter returned no response");
  }

  return reply;
}
