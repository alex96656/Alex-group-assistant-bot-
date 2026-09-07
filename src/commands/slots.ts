import { Context } from "grammy";
import {
  getEconomy,
  saveEconomy,
} from "../economy/economy";

import {
  sendSlotsCard,
} from "../cards/slots";

const symbols = [
  "🍒",
  "🍋",
  "🍉",
  "⭐",
  "💎",
  "7️⃣",
];

export async function slotsCommand(
  ctx: Context
) {
  if (!ctx.from) return;

  const args =
    ctx.message?.text
      ?.trim()
      .split(/\s+/);

  if (!args || args.length < 2) {
    return ctx.reply(
      "🎰 Usage: /slots <amount>"
    );
  }

  const bet = Number(args[1]);

  if (
    !Number.isFinite(bet) ||
    bet <= 0
  ) {
    return ctx.reply(
      "❌ Enter a valid amount."
    );
  }

  const userId =
    String(ctx.from.id);

  const user =
    getEconomy(userId);

  if (user.balance < bet) {
    return ctx.reply(
      `❌ Not enough Lex Coins.\n💰 Balance: ${user.balance.toLocaleString()}`
    );
  }

  const a =
    symbols[
      Math.floor(
        Math.random() *
          symbols.length
      )
    ];

  const b =
    symbols[
      Math.floor(
        Math.random() *
          symbols.length
      )
    ];

  const c =
    symbols[
      Math.floor(
        Math.random() *
          symbols.length
      )
    ];

  let reward = 0;

  if (a === b && b === c) {
    reward = bet * 5;
  } else if (
    a === b ||
    b === c ||
    a === c
  ) {
    reward = bet * 2;
  }

  user.balance -= bet;

  if (reward > 0) {
    user.balance += reward;
  }

  saveEconomy(
    userId,
    user
  );

  await sendSlotsCard(ctx, {
    a,
    b,
    c,
    bet,
    reward,
    balance: user.balance,
  });
}
