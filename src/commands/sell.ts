// ============================================
// Lexxie MiaBot Sell Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function sellCommand(ctx: Context) {
  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "Usage:\n/sell <item number>\n\nUse /inv to see your items."
    );
  }

  const index = Number(args[1]) - 1;

  const user = getEconomy(ctx.from.id.toString());

  if (!user.items || user.items.length === 0) {
    return ctx.reply("❌ Your inventory is empty.");
  }

  if (isNaN(index) || index < 0 || index >= user.items.length) {
    return ctx.reply("❌ Invalid item number.");
  }

  const item = user.items[index];

  const value = Math.floor(item.price * 0.7);

  user.balance += value;

  user.items.splice(index, 1);

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`💸 Item Sold!

${item.name}

💰 Sold For: ${value.toLocaleString()} Lex Coins

💳 New Balance: ${user.balance.toLocaleString()} Lex Coins`
  );
}
