import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { sendLog } from "../logger";
import {
  addWarning,
  getWarnLimit,
  clearWarnings,
} from "../warnManager";

export async function warnCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to the user's message.\n\nExample:\nReply to a message then send:\n/warn Spamming"
    );
  }

  const reason = ctx.match?.toString().trim() || "No reason provided";

  const warnings = addWarning(ctx.chat.id, target.id);
  const limit = getWarnLimit(ctx.chat.id);

  await ctx.reply(
`⚠️ Warning Issued

👤 User: ${target.first_name}
📝 Reason: ${reason}
📊 Warnings: ${warnings}/${limit}`
  );

await sendLog(
  ctx.api,
  ctx.chat.id,
  `⚠️ <b>User Warned</b>

👤 ${target.first_name}
🆔 <code>${target.id}</code>

👮 Moderator: ${ctx.from?.first_name}

📝 Reason: ${reason}

📊 Warnings: ${warnings}/${limit}`
);
  if (warnings >= limit) {
    try {
      await ctx.kickChatMember(target.id);

      clearWarnings(ctx.chat.id, target.id);

      await ctx.reply(
`👢 User Removed

${target.first_name} reached the warning limit (${limit}) and has been kicked from the group.`
      );
    } catch {
      await ctx.reply(
        "❌ I couldn't kick the user. Make sure I'm an administrator with permission to remove members."
      );
    }
  }
}
