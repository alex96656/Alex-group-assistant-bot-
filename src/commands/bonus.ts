// ============================================
// Lexxie MiaBot Bonus Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const BONUS_COOLDOWN = 6 * 60 * 60 * 1000; // 6 hours

export async function bonusCommand(ctx: Context) {

if (!ctx.from) return;

const user = getEconomy(ctx.from.id.toString());

const now = Date.now();

if (!user.bonus) user.bonus = 0;

const remaining =
BONUS_COOLDOWN - (now - user.bonus);

if (remaining > 0) {

const hours = Math.floor(
remaining / (1000 * 60 * 60)
);

const minutes = Math.floor(
(remaining % (1000 * 60 * 60)) /
(1000 * 60)
);

return ctx.reply(
`🎁 Bonus already claimed.

⏳ Come back in ${hours}h ${minutes}m.`
);

}

const reward =
Math.floor(Math.random() * 1001) + 500;

user.balance += reward;

user.bonus = now;

saveEconomy(
ctx.from.id.toString(),
user
);

await ctx.reply(
`🎁 Bonus Claimed!

🪙 Reward:
${reward.toLocaleString()} Lex Coins

💰 Wallet:
${user.balance.toLocaleString()} Lex Coins`
);

}
