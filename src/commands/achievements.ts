import { Context } from "grammy";
import { getAchievements } from "../economy/achievements";

export async function achievementsCommand(ctx: Context) {
  if (!ctx.from) return;

  const ach = getAchievements(String(ctx.from.id));

  await ctx.reply(
`🏆 <b>Achievements</b>

${ach.firstSteps ? "✅" : "❌"} 🥇 First Steps
${ach.richGuy ? "✅" : "❌"} 💰 Rich Guy
${ach.banker ? "✅" : "❌"} 🏦 Banker
${ach.hardWorker ? "✅" : "❌"} 💼 Hard Worker
${ach.miner ? "✅" : "❌"} ⛏️ Master Miner
${ach.fisherman ? "✅" : "❌"} 🎣 Master Fisher
${ach.luckyOne ? "✅" : "❌"} 🎁 Lucky One

━━━━━━━━━━━━━━
🤖 <b>Powered by Lexxie MiaBot</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
