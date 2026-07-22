// ============================================
// Lexxie MiaBot ID Command
// ============================================

import { Context } from "grammy";

export async function idCommand(ctx: Context) {
  const user =
    ctx.message?.reply_to_message?.from || ctx.from;

  if (!user) {
    return await ctx.reply("❌ Unable to get user information.");
  }

  await ctx.reply(
`👤 User Information

🆔 User ID: ${user.id}
👤 Name: ${user.first_name}
📛 Username: ${user.username ? "@" + user.username : "Not set"}
💬 Chat ID: ${ctx.chat.id}`
  );
}
