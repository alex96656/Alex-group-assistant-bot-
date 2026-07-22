// ============================================
// Lexxie MiaBot Ban Command
// ============================================

import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function banCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    await ctx.reply("❌ This command can only be used in groups.");
    return;
  }

  // Only admins or the owner can use this command
  if (!(await isAdmin(ctx))) {
    await ctx.reply("🚫 Only group administrators can use this command.");
    return;
  }

  if (!ctx.message?.reply_to_message?.from) {
    await ctx.reply(
      "⚠️ Reply to the user's message you want to ban."
    );
    return;
  }

  const target = ctx.message.reply_to_message.from;

  try {
    await ctx.banChatMember(target.id);

    await ctx.reply(
      `🚫 User Banned

👤 ${target.first_name}
🆔 ${target.id}

Successfully removed from the group.`
    );

await sendLog(
  ctx.api,
  ctx.chat.id,
  `🚫 <b>User Banned</b>

👤 ${target.first_name}
🆔 <code>${target.id}</code>

👮 Moderator: ${ctx.from?.first_name}`
);
  } catch {
    await ctx.reply(
      "❌ I couldn't ban this user. Make sure I have permission to ban members."
    );
  }
}
