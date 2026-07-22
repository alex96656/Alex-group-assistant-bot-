import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";

export async function demoteCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply("⚠️ Reply to the user's message you want to demote.");
  }

  try {
    await ctx.api.promoteChatMember(ctx.chat.id, target.id, {
      can_manage_chat: false,
      can_delete_messages: false,
      can_restrict_members: false,
      can_invite_users: false,
      can_pin_messages: false,
    });

    await ctx.reply(
`⬇️ User Demoted

👤 ${target.first_name}
🆔 ${target.id}

Administrator privileges removed.`
    );

    await sendLog(
      ctx.api,
      ctx.chat.id,
      `⬇️ <b>User Demoted</b>

👤 ${target.first_name}
🆔 <code>${target.id}</code>

👮 Demoted by: ${ctx.from?.first_name}`
    );

  } catch {
    await ctx.reply("❌ I couldn't demote this administrator.");
  }
}
