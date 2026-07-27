import { Context } from "grammy";
import { getEconomy } from "../economy/economy";
import { getDatabase, saveDatabase } from "../database/database";

export async function profileCommand(ctx: Context) {
  if (!ctx.from) return;

  const db = getDatabase();

  if (!db.users) db.users = {};

  if (!db.users[ctx.from.id]) {
    db.users[ctx.from.id] = {
      joinedAt: new Date().toISOString(),
      badges: []
    };

    saveDatabase(db);
  }

  const eco = getEconomy(String(ctx.from.id));
  const user = db.users[ctx.from.id];

  const joined = new Date(user.joinedAt).toLocaleDateString();

  await ctx.reply(
`👤 <b>${ctx.from.first_name}</b>

🆔 <code>${ctx.from.id}</code>

💰 Wallet: <b>${eco.balance.toLocaleString()}</b> Lex Coins
🏦 Bank: <b>${eco.bank.toLocaleString()}</b> Lex Coins

⭐ Level: <b>${eco.level}</b>
✨ XP: <b>${eco.xp}</b>

🎖️ Badges:
${user.badges.length ? user.badges.join(" ") : "None"}

📅 Joined:
<b>${joined}</b>

━━━━━━━━━━━━━━
🤖 Powered by <b>Lexxie MiaBot</b>`,
    {
      parse_mode: "HTML"
    }
  );
}
