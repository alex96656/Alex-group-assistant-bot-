import { Context } from "grammy";
import { isOwner } from "../middleware/owner";
import { getDatabase } from "../database/database";

export async function usersCommand(ctx: Context) {
  if (!(await isOwner(ctx))) {
    return ctx.reply("🚫 This command is only available to the bot owner.");
  }

  const db = getDatabase();

  const users = db.users || [];

  if (users.length === 0) {
    return ctx.reply("📭 No users have interacted with the bot yet.");
  }

  let message = `👥 <b>Bot Users (${users.length})</b>\n\n`;

  for (const user of users.slice(0, 50)) {
    message += `• ${user.first_name || "Unknown"} (<code>${user.user_id}</code>)`;

    if (user.username) {
      message += ` - @${user.username}`;
    }

    message += "\n";
  }

  if (users.length > 50) {
    message += `\n...and ${users.length - 50} more users.`;
  }

  await ctx.reply(message, {
    parse_mode: "HTML",
  });
}
