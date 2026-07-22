import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { clearWarnings } from "../warnManager";

export async function clearWarningsCommand(ctx: Context) {
  if (!ctx.chat) return;

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to the user's message.\n\nExample:\nReply to a user's message and send /clearwarnings"
    );
  }

  clearWarnings(ctx.chat.id, target.id);

  await ctx.reply(
`🗑️ Warnings Cleared

👤 User: ${target.first_name}

✅ All warnings have been removed.`
  );
}
