import { Context } from "grammy";
import { getEconomy } from "../economy/economy";

interface GameCardOptions {
  title: string;
  content: string;
  result?: string;
}

export async function sendGameCard(
  ctx: Context,
  options: GameCardOptions
) {
  if (!ctx.from || !ctx.chat) return;

  const userId = ctx.from.id.toString();
  const user = getEconomy(userId);

  const firstName = ctx.from.first_name || "Player";

  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : firstName;

  const card = `💎 <b>${escapeHtml(options.title)}</b>

👤 <b>${escapeHtml(firstName)}</b>
🔗 ${escapeHtml(username)}

⭐ Level: <b>${user.level}</b>
💰 Balance: <b>${user.balance.toLocaleString()} Lex Coins</b>

━━━━━━━━━━━━━━━━━━━━

${options.content}

${options.result ? `\n${options.result}` : ""}

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>`;

  try {
    // Get Lexxie's profile photo
    const botInfo = await ctx.api.getMe();

    const photos = await ctx.api.getUserProfilePhotos(
      botInfo.id,
      {
        limit: 1,
      }
    );

    if (photos.total_count > 0) {
      const photo = photos.photos[0];
      const largestPhoto = photo[photo.length - 1];

      await ctx.replyWithPhoto(largestPhoto.file_id, {
        caption: card,
        parse_mode: "HTML",
      });

      return;
    }
  } catch (error) {
    console.error("Bot avatar error:", error);
  }

  // Fallback if Lexxie has no profile photo
  await ctx.reply(card, {
    parse_mode: "HTML",
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
