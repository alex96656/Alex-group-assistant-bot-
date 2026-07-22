import { Context } from "grammy";
import { isOwner } from "../middleware/owner";
import { getDatabase } from "../database/database";
import { dashboardKeyboard } from "../dashboardKeyboard";

const START_TIME = Date.now();

function formatUptime(ms: number) {
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);

  return `${days}d ${hours}h ${mins}m`;
}

export async function dashboardCommand(ctx: Context) {
  if (!(await isOwner(ctx))) {
    return ctx.reply("🚫 This command is only available to the bot owner.");
  }

  const db = getDatabase();

  const totalUsers = db.users?.length || 0;
  const totalWarnings = db.warnings?.length || 0;
  const totalWelcomes = Object.keys(db.welcomes || {}).length;
  const totalWarnLimits = Object.keys(db.warnLimits || {}).length;

  const uptime = formatUptime(Date.now() - START_TIME);

  await ctx.reply(
`🤖 <b>Lexxie MiaBot Dashboard</b>

━━━━━━━━━━━━━━━━━━

👥 <b>Total Users:</b> ${totalUsers}

⚠️ <b>Total Warnings:</b> ${totalWarnings}

👋 <b>Welcome Configs:</b> ${totalWelcomes}

⚙️ <b>Warn Limits:</b> ${totalWarnLimits}

⏱️ <b>Uptime:</b> ${uptime}

💾 <b>Database:</b> JSON

📦 <b>Version:</b> 1.0.0

━━━━━━━━━━━━━━━━━━

👑 <b>Owner</b>
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

⚡ <b>Status:</b> Online`,
    {
    parse_mode: "HTML",
    reply_markup: dashboardKeyboard(),
  }
);
}
