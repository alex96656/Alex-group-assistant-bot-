import { Context } from "grammy";

export async function echoCommand(ctx: Context) {
  const text = ctx.match?.toString().trim();

  if (!text) {
    return ctx.reply("❌ Usage:\n/echo Hello world");
  }

  await ctx.reply(text);
}
