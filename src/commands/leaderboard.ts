// ============================================
// Lexxie MiaBot Leaderboard
// ============================================

import { Context } from "grammy";
import { getDatabase } from "../database/database";

export async function leaderboardCommand(ctx: Context) {

  const db = getDatabase();

  if (!db.economy) {
    return ctx.reply("Nobody has joined the economy yet.");
  }

  const players = Object.entries(db.economy)
    .map(([id, data]: any) => ({
      id,
      balance: data.balance + data.bank
    }))
    .sort((a: any, b: any) => b.balance - a.balance)
    .slice(0, 10);

  let text = "🏆 <b>Lex Coins Leaderboard</b>\n\n";

  players.forEach((player: any, index: number) => {

    const user = db.users.find(
      (u: any) => u.user_id === player.id
    );

    const name =
      user?.first_name ||
      user?.username ||
      "Unknown User";

    text += `${index + 1}. ${name}\n🪙 ${player.balance.toLocaleString()} Lex Coins\n\n`;
  });

  await ctx.reply(text, {
    parse_mode: "HTML"
  });

}
