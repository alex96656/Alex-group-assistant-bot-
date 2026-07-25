// ============================================
// Lexxie MiaBot Work Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const WORK_COOLDOWN = 30 * 60 * 1000; // 30 minutes

const jobs = [
  "👨‍💻 Programmer",
  "👮 Police Officer",
  "👨‍🍳 Chef",
  "🚕 Taxi Driver",
  "🛠 Mechanic",
  "👨‍🏫 Teacher",
  "🎨 Designer",
  "📦 Delivery Rider",
  "🧑‍🌾 Farmer",
  "🏗 Builder"
];

export async function workCommand(ctx: Context) {

  if (!ctx.from) return;

  const user = getEconomy(ctx.from.id.toString());

  if (!user.work) user.work = 0;

  const now = Date.now();

  const remaining = WORK_COOLDOWN - (now - user.work);

  if (remaining > 0) {

    const mins = Math.ceil(remaining / 60000);

    return ctx.reply(
      `💼 You're tired.\n\nCome back in ${mins} minute(s).`
    );
  }

  const reward = Math.floor(Math.random() * 901) + 300;

  const job = jobs[Math.floor(Math.random() * jobs.length)];

  user.balance += reward;

  user.work = now;

  saveEconomy(ctx.from.id.toString(), user);

  await ctx.reply(
`💼 Work Complete!

🏢 Job: ${job}

💰 Earned: ${reward.toLocaleString()} Lex Coins

💳 Wallet: ${user.balance.toLocaleString()} Lex Coins`
  );
}
