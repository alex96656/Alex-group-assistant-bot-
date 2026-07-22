// ============================================
// Lexxie MiaBot Bot Info Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";

export async function botInfoCommand(ctx: Context) {
  await ctx.reply(
    `🤖 ${config.botName}

📌 Version: ${config.version}
👤 Owner: ${config.ownerName}
⚡ Status: Online

A smart Telegram assistant built with TypeScript.`
  );
}
