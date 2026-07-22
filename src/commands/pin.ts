import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function pinCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const message = ctx.message?.reply_to_message;

  if (!message) {
    return ctx.reply("⚠️ Reply to the message you want to pin.");
  }

  try {
    await ctx.api.pinChatMessage(ctx.chat.id, message.message_id);

    await ctx.reply("📌 Message pinned successfully.");

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `📌 <b>Message Pinned</b>

👮 Admin: ${ctx.from?.first_name}`
    );
  } catch {
    await ctx.reply("❌ I couldn't pin the message. Make sure I have permission.");
  }
}
