// ============================================
// Lexxie MiaBot Slots Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const symbols = ["🍒", "🍋", "🍉", "⭐", "💎", "7️⃣"];

export async function slotsCommand(ctx: Context) {

  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "Usage:\n/slots <amount>"
    );
  }

  const bet = Number(args[1]);

  if (isNaN(bet) || bet <= 0) {
    return ctx.reply("❌ Enter a valid amount.");
  }

  const user = getEconomy(ctx.from.id.toString());

  if (user.balance < bet) {
    return ctx.reply("❌ You don't have enough Lex Coins.");
  }

  const a = symbols[Math.floor(Math.random() * symbols.length)];
  const b = symbols[Math.floor(Math.random() * symbols.length)];
  const c = symbols[Math.floor(Math.random() * symbols.length)];

  let reward = 0;

  if (a === b && b === c) {
    reward = bet * 5;
  } else if (a === b || b === c || a === c) {
    reward = bet * 2;
  }

  user.balance -= bet;

  if (reward > 0) {
    user.balance += reward;
  }

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`🎰 Slot Machine

${a} | ${b} | ${c}

${reward > 0
? `🎉 You won ${reward.toLocaleString()} Lex Coins!`
: `💔 You lost ${bet.toLocaleString()} Lex Coins.`}

💳 Balance: ${user.balance.toLocaleString()} Lex Coins`
  );

}
