import { Context } from "grammy";

export async function adminsCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  try {
    const admins = await ctx.api.getChatAdministrators(ctx.chat.id);

    let text = `👑 <b>${ctx.chat.title}</b>\n`;
    text += `━━━━━━━━━━━━━━\n`;
    text += `🛡️ <b>Group Administrators</b>\n\n`;

    let ownerCount = 0;
    let adminCount = 0;

    for (const admin of admins) {
      const user = admin.user;

      const name = user.username
        ? `<a href="https://t.me/${user.username}">@${user.username}</a>`
        : user.first_name;

      if (admin.status === "creator") {
        ownerCount++;
        text += `👑 ${name}\n`;
      } else {
        adminCount++;
        text += `🛡️ ${name}\n`;
      }
    }

    text += `\n━━━━━━━━━━━━━━`;
    text += `\n👑 Owner: ${ownerCount}`;
    text += `\n🛡️ Admins: ${adminCount}`;
    text += `\n👥 Total: ${admins.length}`;

    await ctx.reply(text, {
      parse_mode: "HTML",
    });

  } catch {
    await ctx.reply(
      "❌ I couldn't fetch the administrator list. Make sure I'm an administrator."
    );
  }
}
