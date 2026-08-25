import { Context } from "grammy";
import { sendGameCard } from "../cards/game";

export async function diceCommand(ctx: Context) {
  if (!ctx.from) return;

  const roll =
    Math.floor(Math.random() * 6) + 1;

  const diceFaces = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅",
  ];

  await sendGameCard(ctx, {
    title: "🎲 DICE ROLL",

    content: `
🎲 You rolled:

#️⃣ <b>${diceFaces[roll - 1]} ${roll}</b>
`,

    result:
      roll === 6
        ? "🔥 <b>PERFECT ROLL!</b>"
        : roll >= 4
        ? "✨ Nice roll!"
        : "😏 Better luck next time!",
  });
}
