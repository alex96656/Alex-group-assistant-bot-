// ============================================
// Lexxie MiaBot Mute Command
// ============================================

import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function muteCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    await ctx.reply("❌ This command can only be used in groups.");
    return;
  }

  if (!(await isAdmin(ctx))) {
    await ctx.reply("🚫 Only group administrators can use this command.");
    return;
  }

  if (!ctx.message?.reply_to_message?.from) {
    await ctx.reply("⚠️ Reply to the user's message you want to mute.");
    return;
  }

  const target = ctx.message.reply_to_message.from;

  try {
    await ctx.restrictChatMember(target.id, {
      permissions: {
        can_send_messages: false,
      },
    });

    await ctx.reply(
      `🔇 User Muted

👤 ${target.first_name}
🆔 ${target.id}

The user can no longer send messages.`
    );

await sendLog(
  ctx.api,
  ctx.chat.id,
  `👢 <b>User Kicked</b>

👤 ${target.first_name}
🆔 <code>${target.id}</code>

👮 Moderator: ${ctx.from?.first_name}`
);
  } catch {
    await ctx.reply(
      "❌ I couldn't mute this user. Make sure I have permission to restrict members."
    );
  }
}
