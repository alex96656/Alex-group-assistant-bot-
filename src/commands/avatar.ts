// ============================================
// Lexxie MiaBot Avatar Command
// ============================================

import { Context } from "grammy";

export async function avatarCommand(ctx: Context) {
  const user =
    ctx.message?.reply_to_message?.from || ctx.from;

  if (!user) {
    return ctx.reply("❌ User not found.");
  }

  const photos = await ctx.api.getUserProfilePhotos(user.id, {
    limit: 1,
  });

  if (photos.total_count === 0) {
    return ctx.reply(
      `${user.first_name} doesn't have a profile photo.`
    );
  }

  const photo = photos.photos[0][photos.photos[0].length - 1];

  await ctx.replyWithPhoto(photo.file_id, {
    caption: `🖼️ ${user.first_name}'s Telegram profile photo`,
  });
}
