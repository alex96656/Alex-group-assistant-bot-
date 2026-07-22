// ============================================
// Lexxie MiaBot Owner Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";

export async function ownerCommand(ctx: Context) {
  await ctx.reply(
    `👑 Bot Owner

Name: ${config.ownerName}

Thanks for using ${config.botName} 🚀`
  );
}
