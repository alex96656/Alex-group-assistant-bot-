// ============================================
// Lexxie MiaBot Daily Reward
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const DAILY_REWARD = 1000;
const COOLDOWN = 24 * 60 * 60 * 1000;

export async function dailyCommand(ctx: Context) {
  if (!ctx.from) return;

  const user = getEconomy(ctx.from.id.toString());

  const now = Date.now();

  if (now - user.daily < COOLDOWN) {
    const remaining = COOLDOWN - (now - user.daily);

    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);

    return ctx.reply(
      `⏳ You have already claimed your daily reward.\n\nTry again in ${hours}h ${minutes}m.`
    );
  }

  user.balance += DAILY_REWARD;
  user.daily = now;

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`🎉 Daily Reward Claimed!

🪙 +${DAILY_REWARD.toLocaleString()} Lex Coins

💰 New Balance: ${user.balance.toLocaleString()} Lex Coins`
  );
}
