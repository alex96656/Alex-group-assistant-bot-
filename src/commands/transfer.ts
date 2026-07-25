// ============================================
// Lexxie MiaBot Transfer Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function transferCommand(ctx: Context) {
  if (!ctx.from) return;

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to the user's message.\n\nExample:\nReply to someone's message then send:\n/transfer 500"
    );
  }

  if (target.id === ctx.from.id) {
    return ctx.reply("❌ You can't transfer Lex Coins to yourself.");
  }

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply("Usage:\n/transfer <amount>");
  }

  const amount = Number(args[1]);

  if (isNaN(amount) || amount <= 0) {
    return ctx.reply("❌ Enter a valid amount.");
  }

  const sender = getEconomy(ctx.from.id.toString());
  const receiver = getEconomy(target.id.toString());

  if (sender.balance < amount) {
    return ctx.reply("❌ You don't have enough Lex Coins.");
  }

  sender.balance -= amount;
  receiver.balance += amount;

  saveEconomy(ctx.from.id.toString(), sender);
  saveEconomy(target.id.toString(), receiver);

  await ctx.reply(
`💸 Transfer Successful!

👤 Recipient: ${target.first_name}

🪙 Amount: ${amount.toLocaleString()} Lex Coins

💰 Your Balance: ${sender.balance.toLocaleString()} Lex Coins`
  );
}
