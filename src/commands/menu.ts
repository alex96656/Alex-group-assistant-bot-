// ============================================
// Lexxie MiaBot Menu Command
// ============================================

import { Context } from "grammy";
import { config } from "../config";
import { mainKeyboard } from "../keyboards";

export async function menuCommand(ctx: Context) {
  await ctx.reply(
    `🖥️ ${config.botName}

╭━━━〔 SYSTEM ONLINE 〕━━━╮
┃ ⚡ Status: Online
┃ 🤖 Version: ${config.version}
┃ 👑 Owner: ${config.ownerName}
╰━━━━━━━━━━━━━━━━━━━━━━╯

Welcome to the control menu.

Choose an option below 👇`,
    {
      reply_markup: mainKeyboard(),
    }
  );
}
