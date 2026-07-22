// ============================================
// Lexxie MiaBot Owner Panel Command
// ============================================

import { Context } from "grammy";
import { isOwner } from "../middleware/owner";
import { ownerKeyboard } from "../ownerKeyboard";

export async function panelCommand(ctx: Context) {

  const owner = await isOwner(ctx);

  if (!owner) {
    await ctx.reply("❌ Access denied. Owner only.");
    return;
  }

  await ctx.reply(
`👑 Lexxie MiaBot Owner Panel

🟢 Bot Status: Online
⚙️ Mode: Development

Choose an option below 👇`,
    {
      reply_markup: ownerKeyboard(),
    }
  );
}
