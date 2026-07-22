// ============================================
// Lexxie MiaBot Server Command
// ============================================

import { Context } from "grammy";
import os from "os";

export async function serverCommand(ctx: Context) {
  const memory = process.memoryUsage().rss / 1024 / 1024;

  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  await ctx.reply(
    `🖥️ Lexxie MiaBot Server

🟢 Status: Online
💻 Platform: ${os.platform()}
⚡ Node.js: ${process.version}
🧠 Memory: ${memory.toFixed(2)} MB
⏱ Uptime: ${hours}h ${minutes}m ${seconds}s`
  );
}
