import { Context } from "grammy";
import { getWelcome } from "../welcomeManager";

export async function welcomeMiddleware(
  ctx: Context,
  next: () => Promise<void>
) {
  const members = ctx.message?.new_chat_members;

  if (members && ctx.chat) {
    const settings = getWelcome(ctx.chat.id);

    if (settings.enabled) {
      for (const user of members) {
        const text = settings.message
          .replace("{first_name}", user.first_name)
          .replace(
            "{username}",
            user.username ? "@" + user.username : user.first_name
          )
          .replace("{group_name}", ctx.chat.title || "this group");

        await ctx.reply(text, {
          parse_mode: "Markdown",
        });
      }
    }
  }

  await next();
}
