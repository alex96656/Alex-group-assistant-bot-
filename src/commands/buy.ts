// ============================================
// Lexxie MiaBot Buy Command
// ============================================

import { Context } from "grammy";
import { SHOP_ITEMS } from "../economy/shop";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function buyCommand(ctx: Context) {

  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "Usage:\n/buy <item id>"
    );
  }

  const id = Number(args[1]);

  const item = SHOP_ITEMS.find(
    (i) => i.id === id
  );

  if (!item) {
    return ctx.reply("❌ Item not found.");
  }

  const user = getEconomy(
    ctx.from.id.toString()
  );

  if (!user.items) user.items = [];

  const alreadyOwned = user.items.find(
    (i: any) => i.id === item.id
  );

  if (alreadyOwned) {
    return ctx.reply(
      "❌ You already own this item."
    );
  }

  if (user.balance < item.price) {
    return ctx.reply(
      "❌ You don't have enough Lex Coins."
    );
  }

  user.balance -= item.price;

  user.items.push(item);

  saveEconomy(
    ctx.from.id.toString(),
    user
  );

  await ctx.reply(
`🛍 Purchase Successful!

${item.name}

💰 Price:
${item.price.toLocaleString()} Lex Coins

🎒 Added to your inventory!`
  );

}
