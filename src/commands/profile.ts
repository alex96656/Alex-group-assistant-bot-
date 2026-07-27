import { Context } from "grammy";
import { getDatabase, saveDatabase } from "../database/database";
import { getEconomy } from "../economy/economy";

export async function profileCommand(ctx: Context) {
  if (!ctx.from) return;

  const db = getDatabase();

  if (!db.profiles) db.profiles = {};

  const id = String(ctx.from.id);

  if (!db.profiles[id]) {
    db.profiles[id] = {
      joinedAt: Date.now(),
      badges: []
    };

    saveDatabase(db);
  }

  const profile = db.profiles[id];
  const eco = getEconomy(id);

  const joined = new Date(profile.joinedAt).toLocaleDateString();

  await ctx.reply(
`👤 <b>${ctx.from.first_name}</b>

🆔 ID: <code>${id}</code>

💰 Wallet: <b>${eco.balance.toLocaleString()}</b> Lex Coins
🏦 Bank: <b>${eco.bank.toLocaleString()}</b> Lex Coins

⭐ Level: <b>${eco.level}</b>
✨ XP: <b>${eco.xp}</b>

🎖️ Badges:
${profile.badges.length ? profile.badges.join(" ") : "None"}

📅 Joined:
<b>${joined}</b>

━━━━━━━━━━━━━━━━━━
🤖 <b>Powered by Lexxie MiaBot</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
