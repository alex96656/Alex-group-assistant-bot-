// ============================================
// Lexxie MiaBot Unmute Command
// ============================================

import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function unmuteCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    await ctx.reply("❌ This command can only be used in groups.");
    return;
  }

  if (!(await isAdmin(ctx))) {
    await ctx.reply("🚫 Only group administrators can use this command.");
    return;
  }

  if (!ctx.message?.reply_to_message?.from) {
    await ctx.reply("⚠️ Reply to the user's message you want to unmute.");
    return;
  }

  const target = ctx.message.reply_to_message.from;

  try {
    await ctx.restrictChatMember(target.id, {
      permissions: {
        can_send_messages: true,
        can_send_audios: true,
        can_send_documents: true,
        can_send_photos: true,
        can_send_videos: true,
        can_send_video_notes: true,
        can_send_voice_notes: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
        can_change_info: false,
        can_invite_users: true,
        can_pin_messages: false,
      },
    });

    await ctx.reply(
      `🔊 User Unmuted

👤 ${target.first_name}
🆔 ${target.id}

The user can send messages again.`
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
      "❌ I couldn't unmute this user. Make sure I have permission to restrict members."
    );
  }
}
