// ============================================
// Lexxie MiaBot Start Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";
import { mainKeyboard } from "../keyboards";
import { forceJoin } from "../middleware/forceJoin";

export async function startCommand(ctx: Context) {
  // Check if user has joined required channels/groups
  const joined = await forceJoin(ctx);

  if (!joined) {
    return;
  }

  await ctx.reply(
`🤖 <b>Welcome to ${config.botName}!</b>

👋 Hello <b>${ctx.from?.first_name || "User"}</b>!

I'm your smart Telegram assistant.

✨ <b>What I Can Do</b>

🛡️ Advanced Group Moderation
💰 Complete Economy System
🎮 Fun & Mini Games
📝 Notes & Welcome System
⚠️ Warning & Anti-Link Protection
🎁 Gift Codes & Rewards
🏆 Leaderboards
👥 User Management
📖 TEX Clan Commands
⚡ Fast • Secure • Reliable

━━━━━━━━━━━━━━━━━━━━

📚 Use /help to see all available commands.

💙 Thank you for choosing <b>${config.botName}</b>.`,
    {
      parse_mode: "HTML",
      reply_markup: mainKeyboard(),
    }
  );
}
