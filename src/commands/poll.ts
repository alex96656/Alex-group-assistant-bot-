import { Context } from "grammy";

export async function pollCommand(ctx: Context) {
  await ctx.replyWithPoll(
    "What's your favorite programming language?",
    ["Python", "JavaScript", "TypeScript", "Java"]
  );
}
