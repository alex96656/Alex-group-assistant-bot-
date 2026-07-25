// ============================================
// Lexxie MiaBot Mine Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const MINE_COOLDOWN = 20 * 60 * 1000; // 20 minutes

const ores = [
  "🪨 Stone",
  "🪙 Copper",
  "🥈 Silver",
  "🥇 Gold",
  "💎 Diamond",
  "💠 Emerald"
];

export async function mineCommand(ctx: Context) {

  if (!ctx.from) return;

  const user = getEconomy(ctx.from.id.toString());

  if (!user.mine) user.mine = 0;

  const now = Date.now();

  const remaining = MINE_COOLDOWN - (now - user.mine);

  if (remaining > 0) {

    const mins = Math.ceil(remaining / 60000);

    return ctx.reply(
      `⛏ You're tired.\n\nCome back in ${mins} minute(s).`
    );

  }

  let reward = Math.floor(Math.random() * 1201) + 500;

  const ore = ores[Math.floor(Math.random() * ores.length)];

  // Pickaxe bonus
  const hasPickaxe =
    user.items?.some((i: any) =>
      i.name.includes("Pickaxe")
    );

  if (hasPickaxe) {
    reward += 500;
  }

  user.balance += reward;
  user.mine = now;

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`⛏ Mining Complete!

You found:

${ore}

💰 Earned:
${reward.toLocaleString()} Lex Coins

💳 Wallet:
${user.balance.toLocaleString()} Lex Coins

${hasPickaxe ? "⛏ Pickaxe Bonus: +500 Coins" : ""}`
  );

}
