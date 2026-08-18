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
        const firstName = user.first_name || "New Member";
        const username = user.username
          ? `@${user.username}`
          : "No username";
        const groupName =
          ctx.chat.type === "private"
            ? "this group"
            : ctx.chat.title || "this group";

        const text = `🎉 <b>NEW MEMBER!</b>

👋 Welcome <b>${firstName}</b>!

👤 Username: <b>${username}</b>
👥 Group: <b>${groupName}</b>

💫 We're happy to have you here!
Enjoy the community, meet everyone and have fun. ❤️

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>`;

        try {
          const photos = await ctx.api.getUserProfilePhotos(user.id, {
            limit: 1,
          });

          if (photos.total_count > 0) {
            const photo = photos.photos[0];

            const largestPhoto = photo[photo.length - 1];

            await ctx.replyWithPhoto(largestPhoto.file_id, {
              caption: text,
              parse_mode: "HTML",
            });
          } else {
            await ctx.reply(text, {
              parse_mode: "HTML",
            });
          }
        } catch (error) {
          console.error("Welcome profile photo error:", error);

          await ctx.reply(text, {
            parse_mode: "HTML",
          });
        }
      }
    }
  }

  await next();
}
