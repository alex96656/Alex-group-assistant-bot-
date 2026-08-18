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

    const ownerId = Number(process.env.OWNER_ID);
const senderId = ctx.from?.id;

const isOwner = senderId === ownerId;

console.log("Sender ID:", senderId);
console.log("Owner ID:", ownerId);
console.log("Is Owner:", isOwner);

const reply = await askAI(message, isOwner);

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
