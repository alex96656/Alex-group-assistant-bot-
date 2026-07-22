import { Context } from "grammy";

export async function diceCommand(ctx: Context) {
  await ctx.replyWithDice();
}
