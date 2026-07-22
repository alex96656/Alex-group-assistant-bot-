// ============================================
// Lexxie MiaBot Whois Command
// ============================================

import { Context } from "grammy";

export async function whoisCommand(ctx: Context) {

  const user = ctx.message?.reply_to_message?.from;

  if (!user) {
    await ctx.reply(
      "⚠️ Reply to a user's message to use /whois"
    );
    return;
  }

  await ctx.reply(
`👤 User Information

🆔 ID: ${user.id}
👤 Name: ${user.first_name}
📛 Username: ${user.username ? "@" + user.username : "No username"}
🤖 Bot Account: ${user.is_bot ? "Yes" : "No"}`
  );
}
