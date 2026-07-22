import { Context } from "grammy";

export async function reportCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  const target = ctx.message?.reply_to_message?.from;

  if (!target) {
    return ctx.reply(
      "⚠️ Reply to the user's message.\n\nExample:\n/report Spamming"
    );
  }

  const reporter = ctx.from;
  const reason = ctx.match?.toString().trim() || "No reason provided";

  await ctx.reply(
`🚨 <b>User Report</b>

👤 <b>Reported:</b> ${target.first_name}
🆔 <code>${target.id}</code>

🙋 <b>Reported by:</b> ${reporter?.first_name}

📝 <b>Reason:</b>
${reason}

⚠️ <b>Admins, please review this report.</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
