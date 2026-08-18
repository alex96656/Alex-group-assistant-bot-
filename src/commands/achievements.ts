import { Context } from "grammy";
import { getAchievements } from "../economy/achievements";

export async function achievementsCommand(ctx: Context) {
  if (!ctx.from) return;

  const ach = getAchievements(String(ctx.from.id));

  const list = [
    ["firstSteps", "🥇", "First Steps"],
    ["richGuy", "💰", "Rich Guy"],
    ["banker", "🏦", "Banker"],
    ["hardWorker", "💼", "Hard Worker"],
    ["miner", "⛏️", "Master Miner"],
    ["fisherman", "🎣", "Master Fisher"],
    ["luckyOne", "🎁", "Lucky One"],
    ["levelMaster", "⭐", "Level Master"],
    ["millionaire", "💎", "Millionaire"],
    ["veteran", "🏆", "Veteran"],
    ["activeUser", "🔥", "Active User"],
  ] as const;

  const unlocked = list.filter(([key]) => ach[key]).length;

  const text = list
    .map(
      ([key, emoji, name]) =>
        `${ach[key] ? "✅" : "🔒"} ${emoji} <b>${name}</b>`
    )
    .join("\n");

  await ctx.reply(
    `🏆 <b>ACHIEVEMENTS</b>

👤 <b>${ctx.from.first_name}</b>

${text}

━━━━━━━━━━━━━━━━━━
🎖️ Unlocked: <b>${unlocked}/${list.length}</b>

Keep playing and using the bot to unlock more! 🚀`,
    {
      parse_mode: "HTML",
    }
  );
}
