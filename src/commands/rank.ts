import { Context } from "grammy";
import { getEconomy } from "../economy/economy";

export async function rankCommand(ctx: Context) {
  if (!ctx.from) return;

  const user = getEconomy(String(ctx.from.id));

  await ctx.reply(
`🏆 <b>Your Rank</b>

👤 <b>${user.nickname || ctx.from.first_name}</b>

⭐ Level: <b>${user.level}</b>
✨ XP: <b>${user.xp}</b>

🥇 Global Rank:
<b>Coming Soon...</b>

━━━━━━━━━━━━━━
🤖 <b>Powered by Lexxie MiaBot</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
