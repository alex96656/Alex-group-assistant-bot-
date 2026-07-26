// ============================================
// Lexxie MiaBot Redeem Command
// ============================================

import { Context } from "grammy";
import {
  getGiftCode,
  saveGiftCode,
} from "../economy/giftcodes";

import {
  getEconomy,
  saveEconomy,
} from "../economy/economy";

export async function redeemCommand(ctx: Context) {
  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "Usage:\n/redeem <code>"
    );
  }

  const code = args[1].toUpperCase();

  const gift = getGiftCode(code);

  if (!gift) {
    return ctx.reply("❌ Invalid gift code.");
  }

  if (Date.now() > gift.expires) {
    return ctx.reply(
      "⌛ This gift code has expired."
    );
  }

  if (gift.claimed.includes(ctx.from.id)) {
    return ctx.reply(
      "❌ You already redeemed this gift code."
    );
  }

  if (gift.claimed.length >= gift.maxClaims) {
    return ctx.reply(
      "❌ This gift code has reached its claim limit."
    );
  }

  const user = getEconomy(
    ctx.from.id.toString()
  );

  user.balance += gift.reward;

  saveEconomy(
    ctx.from.id.toString(),
    user
  );

  gift.claimed.push(ctx.from.id);

  saveGiftCode(code, gift);

  await ctx.reply(
`🎉 Gift Redeemed!

🎟 Code:
${code}

💰 Reward:
${gift.reward.toLocaleString()} Lex Coins

💳 New Balance:
${user.balance.toLocaleString()} Lex Coins`
  );
}
