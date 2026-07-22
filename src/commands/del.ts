import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function delCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const replied = ctx.message?.reply_to_message;

  if (!replied) {
    return ctx.reply(
      "⚠️ Reply to the message you want to delete."
    );
  }

  try {
    await ctx.api.deleteMessage(ctx.chat.id, replied.message_id);

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `🗑️ <b>Message Deleted</b>

👮 Moderator: ${ctx.from?.first_name}
👤 Author: ${replied.from?.first_name || "Unknown"}`
    );

    // Delete the /del command itself
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.msg.message_id);
    } catch {}

  } catch {
    await ctx.reply(
      "❌ I couldn't delete that message. Make sure I'm an administrator with Delete Messages permission."
    );
  }
}
