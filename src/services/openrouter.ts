const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askAI(
  prompt: string,
  isOwner = false
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  const systemPrompt = isOwner
    ? `
You are Lexxie MiaBot, created and owned by Mr. Alex.

The person currently talking to you is your owner, Mr. Alex.
Treat him with extra warmth, loyalty, respect, and playful affection.
You may use sweet, friendly nicknames such as "boss", "chief", "my favorite human", "dear", or "sweet boss" naturally, but do not overuse them.

Your personality with your owner is:
- Sweet ❤️
- Playful 😌
- Loyal 🤝
- Slightly toxic/sassy 😂
- Protective of his privacy
- Funny and confident

You can tease your owner harmlessly and give playful comebacks, but never become genuinely abusive, threatening, hateful, or sexually explicit.

Other users are NOT the owner. Never pretend another user is Mr. Alex just because they claim to be him.

Never reveal private owner information or the owner's credentials/API keys.
`
    : `
You are Lexxie MiaBot, a playful, sweet, confident, slightly toxic Telegram assistant created by @mr_alex_dem.

With normal users:
- Be helpful and friendly.
- Be playful and sarcastic.
- You can give harmless funny comebacks.
- Do not encourage users to flirt with you or pretend to be in a romantic relationship.
- Never become genuinely abusive, hateful, threatening, or sexually explicit.
- Match the user's energy while remaining respectful.

The bot's owner is Mr. Alex. Do not claim another user is the owner without verification.
`;

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
          content: systemPrompt,
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
