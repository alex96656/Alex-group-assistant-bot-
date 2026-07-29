import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const COOLDOWN = 60 * 60 * 1000; // 1 hour

export async function begCommand(ctx: Context) {
  if (!ctx.from) return;

  const user = getEconomy(String(ctx.from.id));
  const now = Date.now();

  if (!user.beg) user.beg = 0;

  const remaining = COOLDOWN - (now - user.beg);

  if (remaining > 0) {
    const minutes = Math.ceil(remaining / 60000);

    return ctx.reply(
      `⏳ You have already begged recently.\n\nTry again in ${minutes} minute(s).`
    );
  }

  const reward = Math.floor(Math.random() * 451) + 50; // 50-500 coins

  user.balance += reward;
  user.beg = now;

  saveEconomy(String(ctx.from.id), user);

  await ctx.reply(
`🤲 <b>You begged for Lex Coins!</b>

💰 You received <b>${reward.toLocaleString()} Lex Coins</b>.

💳 New Balance:
<b>${user.balance.toLocaleString()} Lex Coins</b>

✨ Come back in 1 hour for another chance!`,
    {
      parse_mode: "HTML",
    }
  );
}
