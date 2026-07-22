import { Context } from "grammy";

export async function coinflipCommand(ctx: Context) {
  const result = Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";

  await ctx.reply(
`🪙 Coin Flip

Result: ${result}`
  );
}
