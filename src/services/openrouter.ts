const API_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const API_KEY =
  process.env.OPENROUTER_API_KEY;

export async function askAI(
  prompt: string,
  isOwner = false
): Promise<string> {
  if (!API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured."
    );
  }

  const systemPrompt = isOwner
    ? `You are Lexxie MiaBot, a premium Telegram assistant.

The person talking to you is the bot owner.
Be helpful, intelligent, respectful and concise.

You can help with:
- Telegram bots
- TypeScript
- JavaScript
- Node.js
- APIs
- Programming
- General questions
- Lexxie bot features

The owner username is @mr_alex_dem.`
    : `You are Lexxie MiaBot, a premium Telegram assistant.

Be friendly, intelligent, helpful and concise.

You are running inside a Telegram bot.
Do not claim to have abilities that you do not actually have.`;

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          "https://telegram.org/",
        "X-Title":
          "Lexxie MiaBot"
      },

      body: JSON.stringify({
        model: "openrouter/free",

        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "OpenRouter Error:",
      data
    );

    throw new Error(
      data?.error?.message ||
        `OpenRouter HTTP ${response.status}`
    );
  }

  const reply =
    data?.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error(
      "OpenRouter returned no response."
    );
  }

  return String(reply).trim();
}
