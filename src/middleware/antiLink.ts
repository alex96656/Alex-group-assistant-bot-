import { Context, NextFunction } from "grammy";
import { isAdmin } from "./admin";
import { isAntiLinkEnabled } from "../antiLinkManager";
import {
  addWarning,
  getWarnLimit,
  clearWarnings,
} from "../warnManager";

export async function antiLink(ctx: Context, next: NextFunction) {
  if (!ctx.chat || !ctx.message?.text) {
    return next();
  }

  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    return next();
  }

  if (!isAntiLinkEnabled(ctx.chat.id)) {
    return next();
  }

  if (await isAdmin(ctx)) {
    return next();
  }

  const text = ctx.message.text;

  const linkRegex =
    /(https?:\/\/\S+|www\.\S+|t\.me\/\S+|telegram\.me\/\S+|chat\.whatsapp\.com\/\S+)/i;

  if (!linkRegex.test(text)) {
    return next();
  }

  try {
    await ctx.deleteMessage();

    const warnings = addWarning(ctx.chat.id, ctx.from!.id);
    const limit = getWarnLimit(ctx.chat.id);

    await ctx.reply(
      `🚫 ${ctx.from!.first_name}, links are not allowed.\n\n⚠️ Warning: ${warnings}/${limit}`
    );

    if (warnings >= limit) {
      await ctx.banChatMember(ctx.from!.id);

      clearWarnings(ctx.chat.id, ctx.from!.id);

      await ctx.reply(
        `👢 ${ctx.from!.first_name} has been removed for exceeding the warning limit.`
      );
    }
  } catch (err) {
    console.error(err);
  }

  return next();
}
