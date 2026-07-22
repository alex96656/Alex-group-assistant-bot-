import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function promoteCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply("⚠️ Reply to the user's message you want to promote.");
  }

  try {
    await ctx.api.promoteChatMember(ctx.chat.id, target.id, {
      can_manage_chat: true,
      can_delete_messages: true,
      can_restrict_members: true,
      can_invite_users: true,
      can_pin_messages: true,
    });

    await ctx.reply(
`⭐ User Promoted

👤 ${target.first_name}
🆔 ${target.id}

Successfully promoted to administrator.`
    );

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `⭐ <b>User Promoted</b>

👤 ${target.first_name}
🆔 <code>${target.id}</code>

👮 Promoted by: ${ctx.from?.first_name}`
    );

  } catch {
    await ctx.reply("❌ I couldn't promote this user. Make sure I have permission to promote administrators.");
  }
}
