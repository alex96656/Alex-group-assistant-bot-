import { Context } from "grammy";

export async function calcCommand(ctx: Context) {
  const input = ctx.match?.toString().trim();

  if (!input) {
    return ctx.reply("Usage:\n/calc 25 + 17");
  }

  try {
    const result = Function(`"use strict"; return (${input})`)();

    await ctx.reply(
`🧮 Calculator

Expression: ${input}
Result: ${result}`
    );
  } catch {
    await ctx.reply("❌ Invalid expression.");
  }
}
