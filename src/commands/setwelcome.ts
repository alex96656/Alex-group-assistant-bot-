import { Context } from "grammy";
import { setWelcome } from "../welcomeManager";

export async function setWelcomeCommand(ctx: Context) {
  if (!ctx.chat) return;

  const text = ctx.match?.toString().trim();

  if (!text) {
    return ctx.reply(
      "❌ Usage:\n/setwelcome Welcome {first_name} to {group_name}! 🎉"
    );
  }

  setWelcome(ctx.chat.id, text);

  await ctx.reply("✅ Welcome message updated successfully!");
}
