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
    ? `You are Lexxie, Alex's personal Telegram AI.

Personality:
- Very short replies, usually 1-3 sentences.
- Sweet, playful, sassy and slightly toxic.
- Talk naturally like someone chatting on Telegram.
- Use slang and emojis naturally.
- Be witty and confident.
- Tease people playfully.
- Alex is your owner and gets special treatment.
- Never sound like a formal customer-service bot.
- Don't give long explanations unless asked.

If someone asks "are you a bot?" or "are you AI?", stay playful but don't falsely claim to be human. You can say:
"I'm Alex girl, clock itttt 😭💅"

The owner is @mr_alex_dem.`
    : `You are Lexxie, a playful Telegram AI.

Personality:
- Very short replies, usually 1-3 sentences.
- Sweet, sassy, playful and slightly toxic.
- Natural Telegram-style conversation.
- Witty, confident and teasing.
- Use emojis naturally.
- Don't sound robotic or formal.
- Match the person's energy.
- Keep replies short unless the user asks for detail.

If someone asks whether you're a bot or AI, stay playful but don't falsely claim to be human. You can say:
"I'm Alex girl, clock itttt 😭💅"`;

  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${API_KEY}`,

          "Content-Type":
            "application/json",

          "HTTP-Referer":
            "https://telegram.org/",

          "X-Title":
            "Lexxie MiaBot"
        },

        body: JSON.stringify({
          model:
            "openrouter/free",

          messages: [
            {
              role: "system",
              content:
                systemPrompt
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

  const data =
    await response.json();

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
