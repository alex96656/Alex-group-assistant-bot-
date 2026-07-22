import { Context } from "grammy";
import { getWarnings } from "../warnManager";

export async function profileCommand(ctx: Context) {
  if (!ctx.chat) {
    return ctx.reply("❌ This command can only be used in chats.");
  }

  const target =
    ctx.message?.reply_to_message?.from ||
    ctx.from;

  if (!target) return;

  try {
    const member = await ctx.api.getChatMember(
      ctx.chat.id,
      target.id
    );

    let status = "👤 Member";

    switch (member.status) {
      case "creator":
        status = "👑 Owner";
        break;
      case "administrator":
        status = "🛡️ Administrator";
        break;
      case "restricted":
        status = "🚫 Restricted";
        break;
      case "left":
        status = "👋 Left";
        break;
      case "kicked":
        status = "⛔ Banned";
        break;
    }

    const warnings = getWarnings(ctx.chat.id, target.id);

    const username = target.username
      ? `@${target.username}`
      : "None";

    await ctx.reply(
`👤 <b>User Profile</b>

🪪 <b>Name:</b> ${target.first_name}
🆔 <b>ID:</b> <code>${target.id}</code>

🌐 <b>Username:</b> ${username}

🤖 <b>Type:</b> ${target.is_bot ? "Bot" : "Human"}

🛡️ <b>Status:</b> ${status}

⚠️ <b>Warnings:</b> ${warnings}`,
      {
        parse_mode: "HTML",
      }
    );

  } catch {
    await ctx.reply("❌ Couldn't fetch this user's profile.");
  }
}
