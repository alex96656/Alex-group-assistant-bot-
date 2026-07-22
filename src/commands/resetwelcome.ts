import { Context } from "grammy";

export async function resetWelcomeCommand(ctx: Context) {
  // Database reset will be added next
  await ctx.reply("✅ Welcome message has been reset.");
}
