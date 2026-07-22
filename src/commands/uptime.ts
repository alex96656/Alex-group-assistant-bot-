// ============================================
// Lexxie MiaBot Uptime Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";

export async function uptimeCommand(ctx: Context) {
  const uptime = Date.now() - config.startTime;

  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  await ctx.reply(
    `⏱ Bot Uptime

${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
  );
}
