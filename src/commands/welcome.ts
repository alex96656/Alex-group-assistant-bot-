import { Context } from "grammy";
import { toggleWelcome } from "../welcomeManager";

export async function welcomeCommand(ctx: Context) {
  if (!ctx.chat) return;

  const option = ctx.match?.toString().trim().toLowerCase();

  if (option !== "on" && option !== "off") {
    return ctx.reply("❌ Usage:\n/welcome on\n/welcome off");
  }

  toggleWelcome(ctx.chat.id, option === "on");

  await ctx.reply(
    option === "on"
      ? "✅ Welcome messages enabled."
      : "✅ Welcome messages disabled."
  );
}
