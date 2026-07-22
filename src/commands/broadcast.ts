// ============================================
// Lexxie MiaBot Broadcast Command
// ============================================

import { Context } from "grammy";
import { getDatabase } from "../database/database";
import { isOwner } from "../middleware/owner";

export async function broadcastCommand(ctx: Context) {

  const owner = await isOwner(ctx);

  if (!owner) {
    await ctx.reply("❌ Owner only.");
    return;
  }

  const text = ctx.message?.text
    ?.split(" ")
    .slice(1)
    .join(" ");

  if (!text) {
    await ctx.reply(
      "⚠️ Usage:\n/broadcast Your message"
    );
    return;
  }

  const db = getDatabase();

  let sent = 0;

  for (const user of db.users) {
    try {
      await ctx.api.sendMessage(
        user.user_id,
        text
      );

      sent++;

    } catch {
      console.log(
        `Failed to send to ${user.user_id}`
      );
    }
  }

  await ctx.reply(
`✅ Broadcast finished

📨 Sent: ${sent}
👥 Users: ${db.users.length}`
  );
}
