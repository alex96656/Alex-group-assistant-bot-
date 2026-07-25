// ============================================
// Lexxie MiaBot Deposit Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function depositCommand(ctx: Context) {
  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply("Usage:\n/deposit <amount>");
  }

  const amount = Number(args[1]);

  if (isNaN(amount) || amount <= 0) {
    return ctx.reply("❌ Enter a valid amount.");
  }

  const user = getEconomy(ctx.from.id.toString());

  if (user.balance < amount) {
    return ctx.reply("❌ You don't have enough Lex Coins.");
  }

  user.balance -= amount;
  user.bank += amount;

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`🏦 Deposit Successful!

🪙 Deposited: ${amount.toLocaleString()} Lex Coins

💰 Wallet: ${user.balance.toLocaleString()}
🏦 Bank: ${user.bank.toLocaleString()}`
  );
}
