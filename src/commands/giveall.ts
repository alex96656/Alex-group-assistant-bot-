import { Context } from "grammy";
import { getDatabase, saveDatabase } from "../database/database";

const OWNER_ID = 8705922736; // Your Telegram ID

export async function giveAllCommand(ctx: Context) {
  if (!ctx.from) return;

  if (ctx.from.id !== OWNER_ID) {
    return ctx.reply("❌ This command is for the bot owner only.");
  }

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 2) {
    return ctx.reply(
      "Usage:\n/giveall <amount>\n\nExample:\n/giveall 5000"
    );
  }

  const amount = Number(args[1]);

  if (isNaN(amount) || amount <= 0) {
    return ctx.reply("❌ Enter a valid amount.");
  }

  const db = getDatabase();

  if (!db.economy) {
    return ctx.reply("❌ No economy data found.");
  }

  let users = 0;

  for (const userId in db.economy) {
    db.economy[userId].balance += amount;
    users++;
  }

  saveDatabase(db);

  await ctx.reply(
`🎉 Global Reward Sent!

💰 Amount:
${amount.toLocaleString()} Lex Coins

👥 Users Rewarded:
${users}

👑 Sent by the Owner`
  );
}
