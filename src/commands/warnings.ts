import { Context } from "grammy";
import { getWarnings, getWarnLimit } from "../warnManager";

export async function warningsCommand(ctx: Context) {
  if (!ctx.chat) return;

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to the user's message.\n\nExample:\nReply to a user's message and send /warnings"
    );
  }

  const warnings = getWarnings(ctx.chat.id, target.id);
  const limit = getWarnLimit(ctx.chat.id);

  await ctx.reply(
`📋 User Warnings

👤 User: ${target.first_name}
📊 Warnings: ${warnings}/${limit}`
  );
}
