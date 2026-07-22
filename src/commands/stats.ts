// ============================================
// Lexxie MiaBot Stats Command
// ============================================

import { Context } from "grammy";

const startTime = Date.now();

export async function statsCommand(ctx: Context) {
  const uptime = Date.now() - startTime;

  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  await ctx.reply(
`📊 Lexxie MiaBot Statistics

🤖 Status: Online
⚡ Uptime: ${hours}h ${minutes % 60}m ${seconds % 60}s
🚀 Version: 1.0.0
👑 Owner: Alex

💻 Platform: Telegram
`
  );
}
