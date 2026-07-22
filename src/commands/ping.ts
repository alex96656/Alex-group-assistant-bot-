// ============================================
// Lexxie MiaBot Ping Command
// ============================================

import { Context } from "grammy";

export async function pingCommand(ctx: Context) {
  const start = Date.now();

  const message = await ctx.reply("🏓 Pinging...");

  const latency = Date.now() - start;

  await ctx.api.editMessageText(
    ctx.chat.id,
    message.message_id,
    `🏓 Pong!

⚡ Response Time: ${latency} ms
🟢 Status: Online`
  );
}
