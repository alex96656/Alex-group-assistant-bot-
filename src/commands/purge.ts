import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function purgeCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const replied = ctx.message?.reply_to_message;

  if (!replied) {
    return ctx.reply(
      "⚠️ Reply to a message, then use:\n/purge"
    );
  }

  try {
    await ctx.api.deleteMessage(ctx.chat.id, replied.message_id);

    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.msg.message_id);
    } catch {}

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `🧹 <b>Purge Used</b>

👮 Admin: ${ctx.from?.first_name}
🗑️ Deleted the replied message`
    );

  } catch {
    await ctx.reply(
      "❌ I couldn't delete that message."
    );
  }
}
