// ============================================
// Lexxie MiaBot Rob Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const ROB_COOLDOWN = 60 * 60 * 1000; // 1 hour

export async function robCommand(ctx: Context) {
  if (!ctx.from) return;

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to someone's message.\n\nExample:\nReply then send:\n/rob"
    );
  }

  if (target.id === ctx.from.id) {
    return ctx.reply("❌ You can't rob yourself.");
  }

  const robber = getEconomy(ctx.from.id.toString());
  const victim = getEconomy(target.id.toString());

  if (!robber.rob) robber.rob = 0;

  const now = Date.now();

  if (now - robber.rob < ROB_COOLDOWN) {
    const mins = Math.ceil((ROB_COOLDOWN - (now - robber.rob)) / 60000);
    return ctx.reply(`⏳ You can rob again in ${mins} minute(s).`);
  }

  robber.rob = now;

  if (victim.balance < 500) {
    saveEconomy(ctx.from.id.toString(), robber);
    return ctx.reply("💸 This user doesn't have enough Lex Coins to rob.");
  }

  const success = Math.random() < 0.5;

  if (success) {
    const amount = Math.floor(Math.random() * Math.min(5000, victim.balance - 100)) + 100;

    victim.balance -= amount;
    robber.balance += amount;

    saveEconomy(ctx.from.id.toString(), robber);
    saveEconomy(target.id.toString(), victim);

    return ctx.reply(
`🥷 Robbery Successful!

👤 Victim: ${target.first_name}

💰 Stolen: ${amount.toLocaleString()} Lex Coins`
    );
  } else {
    const fine = Math.min(1000, robber.balance);

    robber.balance -= fine;

    saveEconomy(ctx.from.id.toString(), robber);

    return ctx.reply(
`🚔 You got caught!

💸 Fine: ${fine.toLocaleString()} Lex Coins`
    );
  }
}
