import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";
import { sendGameCard } from "../cards/game";

const symbols = [
  "🍒",
  "🍋",
  "🍉",
  "⭐",
  "💎",
  "7️⃣",
];

export async function slotsCommand(ctx: Context) {
  if (!ctx.from) return;

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "🎰 Usage: /slots <amount>"
    );
  }

  const bet = Number(args[1]);

  if (!Number.isFinite(bet) || bet <= 0) {
    return ctx.reply(
      "❌ Enter a valid amount."
    );
  }

  const user = getEconomy(
    ctx.from.id.toString()
  );

  if (user.balance < bet) {
    return ctx.reply(
      "❌ You don't have enough Lex Coins."
    );
  }

  const a =
    symbols[Math.floor(Math.random() * symbols.length)];

  const b =
    symbols[Math.floor(Math.random() * symbols.length)];

  const c =
    symbols[Math.floor(Math.random() * symbols.length)];

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
    ctx.from.id.toString(),
    user
  );

  const result =
    reward > 0
      ? `🎉 <b>YOU WON!</b>

💰 Reward: <b>+${reward.toLocaleString()} Lex Coins</b>`
      : `💔 <b>YOU LOST!</b>

💸 Lost: <b>${bet.toLocaleString()} Lex Coins</b>`;

  await sendGameCard(ctx, {
    title: "🎰 SLOT MACHINE",

    content: `
╔══════════════╗
   ${a}  |  ${b}  |  ${c}
╚══════════════╝
`,

    result: `${result}

💳 New Balance:
<b>${user.balance.toLocaleString()} Lex Coins</b>`,
  });
}
