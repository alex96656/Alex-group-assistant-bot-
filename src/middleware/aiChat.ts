import { Context, NextFunction } from "grammy";
import { askAI } from "../services/openrouter";

export async function aiChat(
  ctx: Context,
  next: NextFunction
) {
  if (ctx.message?.text?.startsWith("/")) {
    return next();
  }

  const message = ctx.message?.text?.trim();

  if (!message || !ctx.chat || !ctx.from) {
    return next();
  }

  const isPrivate =
    ctx.chat.type === "private";

  const isReplyToBot =
    ctx.message.reply_to_message?.from?.is_bot === true;

  const mentionsLexxie =
    /\blexxie\b/i.test(message);

  if (
    !isPrivate &&
    !isReplyToBot &&
    !mentionsLexxie
  ) {
    return next();
  }

  try {
    const ownerId =
      Number(process.env.OWNER_ID);

    const senderId =
      ctx.from.id;

    const isOwner =
      senderId === ownerId;

    await ctx.api.sendChatAction(
      ctx.chat.id,
      "typing"
    );

    const typingInterval =
      setInterval(() => {
        ctx.api
          .sendChatAction(
            ctx.chat!.id,
            "typing"
          )
          .catch(() => {});
      }, 4000);

    try {
      const reply =
        await askAI(
          message,
          isOwner
        );

      await ctx.reply(
        reply,
        {
          reply_parameters: {
            message_id:
              ctx.message.message_id
          }
        }
      );
    } finally {
      clearInterval(
        typingInterval
      );
    }
  } catch (error) {
    console.error(
      "AI Chat Error:",
      error
    );

    await ctx.reply(
      "❌ AI is unavailable right now."
    );
  }
}
