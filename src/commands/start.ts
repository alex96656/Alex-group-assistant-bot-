// ============================================
// Lexxie MiaBot Start Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";
import { mainKeyboard } from "../keyboards";

export async function startCommand(ctx: Context) {
  await ctx.reply(
`🤖 <b>Welcome to ${config.botName}!</b>

👋 Hello ${ctx.from?.first_name || "User"}!

I'm your smart Telegram assistant.

📦 <b>24+ Commands</b>
⚡ <b>Fast & Reliable</b>
🛡️ <b>Moderation Tools</b>
🎉 <b>Fun Commands</b>
📝 <b>Notes System</b>

━━━━━━━━━━━━━━━━━━━━

📚 Use /help to view all commands.
⚙️ Use the buttons below to explore.`,
    {
      parse_mode: "HTML",
      reply_markup: mainKeyboard(),
    }
  );
}
