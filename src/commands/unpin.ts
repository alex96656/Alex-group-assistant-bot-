import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function unpinCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  try {
    await ctx.api.unpinAllChatMessages(ctx.chat.id);

    await ctx.reply("📌 All pinned messages have been unpinned.");

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `📌 <b>Messages Unpinned</b>

👮 Admin: ${ctx.from?.first_name}`
    );
  } catch {
    await ctx.reply("❌ I couldn't unpin the messages.");
  }
}
