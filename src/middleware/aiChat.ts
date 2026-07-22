import { Context, NextFunction } from "grammy";
import { askAI } from "../services/openrouter";

export async function aiChat(ctx: Context, next: NextFunction) {
  if (ctx.message?.text?.startsWith("/")) {
    return next();
  }

  const message = ctx.message?.text;
  if (!message) {
    return next();
  }

  const isPrivate = ctx.chat?.type === "private";

  const isReplyToBot =
    ctx.message?.reply_to_message?.from?.is_bot === true;

  if (!isPrivate && !isReplyToBot) {
    return next();
  }

  try {

    const reply = await askAI(message);

    await ctx.reply(reply, {
      reply_parameters: {
        message_id: ctx.message.message_id,
      },
    });
  } catch (error) {
    console.error(error);
    await ctx.reply("❌ AI is unavailable right now.");
  }
}
