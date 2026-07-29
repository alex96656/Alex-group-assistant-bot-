import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function bioCommand(ctx: Context) {
  if (!ctx.from) return;

  const text = ctx.match?.toString().trim();

  if (!text) {
    return ctx.reply(
      "❌ Usage:\n/bio Your bio here"
    );
  }

  const user = getEconomy(String(ctx.from.id));

  user.bio = text;

  saveEconomy(String(ctx.from.id), user);

  await ctx.reply(
`✅ <b>Bio Updated!</b>

📝 ${text}`,
    {
      parse_mode: "HTML",
    }
  );
}
