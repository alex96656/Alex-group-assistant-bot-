import { Context } from "grammy";
import { getGoodbye } from "../welcomeManager";

export async function goodbyeMiddleware(
  ctx: Context,
  next: () => Promise<void>
) {
  const member = ctx.message?.left_chat_member;

  if (member && ctx.chat) {
    const settings = getGoodbye(ctx.chat.id);

    if (settings.enabled) {
      const firstName =
        member.first_name || "Member";

      const username = member.username
        ? `@${member.username}`
        : "No username";

      const groupName =
        ctx.chat.title || "this group";

      const text = settings.message
        .replace(
          /{first_name}/g,
          firstName
        )
        .replace(
          /{username}/g,
          username
        )
        .replace(
          /{group_name}/g,
          groupName
        );

      const finalText = `${text}

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>`;

      try {
        const photos =
          await ctx.api.getUserProfilePhotos(
            member.id,
            {
              limit: 1,
            }
          );

        if (photos.total_count > 0) {
          const photo =
            photos.photos[0];

          const largestPhoto =
            photo[photo.length - 1];

          await ctx.replyWithPhoto(
            largestPhoto.file_id,
            {
              caption: finalText,
              parse_mode: "HTML",
            }
          );
        } else {
          await ctx.reply(finalText, {
            parse_mode: "HTML",
          });
        }
      } catch (error) {
        console.error(
          "Goodbye profile photo error:",
          error
        );

        await ctx.reply(finalText, {
          parse_mode: "HTML",
        });
      }
    }
  }

  await next();
}
