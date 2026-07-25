// ============================================
// Lexxie MiaBot Inventory
// ============================================

import { Context } from "grammy";
import { getEconomy } from "../economy/economy";

export async function invCommand(ctx: Context) {

  if (!ctx.from) return;

  const user = getEconomy(ctx.from.id.toString());

  if (!user.items || user.items.length === 0) {
    return ctx.reply(
      "🎒 Your inventory is empty.\n\nUse /shop to buy items."
    );
  }

  let text = "🎒 <b>Your Inventory</b>\n\n";

  user.items.forEach((item: any, index: number) => {
    text += `${index + 1}. ${item.name}\n`;
    text += `💰 Value: ${item.price.toLocaleString()} Lex Coins\n\n`;
  });

  text += `📦 Total Items: ${user.items.length}`;

  await ctx.reply(text, {
    parse_mode: "HTML",
  });

}
