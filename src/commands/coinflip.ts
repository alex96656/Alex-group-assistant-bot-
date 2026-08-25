import { Context } from "grammy";
import { sendGameCard } from "../cards/game";

export async function coinflipCommand(ctx: Context) {
  const heads = Math.random() < 0.5;

  const result = heads
    ? "🪙 <b>HEADS!</b>"
    : "🪙 <b>TAILS!</b>";

  await sendGameCard(ctx, {
    title: "🪙 COIN FLIP",
    content: `
🎲 The coin has been flipped!

${result}
`,
    result: "✨ Good luck on your next flip!",
  });
}
