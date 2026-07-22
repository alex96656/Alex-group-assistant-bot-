// ============================================
// Lexxie MiaBot UserInfo Command
// ============================================

import { Context } from "grammy";

export async function userinfoCommand(ctx: Context) {
  const user =
    ctx.message?.reply_to_message?.from || ctx.from;

  if (!user) {
    return ctx.reply("❌ Unable to get user information.");
  }

  await ctx.reply(
`👤 User Information

🆔 ID: ${user.id}
👤 Name: ${user.first_name}
📛 Username: ${user.username ? "@" + user.username : "None"}
🌐 Language: ${user.language_code || "Unknown"}
🤖 Bot: ${user.is_bot ? "Yes" : "No"}`
  );
}
