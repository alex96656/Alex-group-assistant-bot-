// ============================================
// Lexxie MiaBot Balance Command
// ============================================

import { Context } from "grammy";
import { getEconomy } from "../economy/economy";

export async function balanceCommand(ctx: Context) {
  if (!ctx.from) return;

  const user = getEconomy(ctx.from.id.toString());

  await ctx.reply(
`💰 <b>Lex Coins Wallet</b>

👤 ${ctx.from.first_name}

🪙 Wallet: <b>${user.balance.toLocaleString()} Lex Coins</b>
🏦 Bank: <b>${user.bank.toLocaleString()} Lex Coins</b>

💎 Total Wealth: <b>${(user.balance + user.bank).toLocaleString()} Lex Coins</b>`,
    {
      parse_mode: "HTML"
    }
  );
}
