import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

export async function setNickCommand(ctx: Context) {
  if (!ctx.from) return;

  const nickname = ctx.match?.toString().trim();

  if (!nickname) {
    return ctx.reply(
      "❌ Usage:\n/setnick Your Nickname"
    );
  }

  if (nickname.length > 20) {
    return ctx.reply("❌ Nickname must not be longer than 20 characters.");
  }

  const user = getEconomy(String(ctx.from.id));

  user.nickname = nickname;

  saveEconomy(String(ctx.from.id), user);

  await ctx.reply(
`✅ <b>Nickname Updated!</b>

👤 New Nickname:
<b>${nickname}</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
