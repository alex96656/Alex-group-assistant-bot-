import { Context, InputFile } from "grammy";
import { isOwner } from "../middleware/owner";
import path from "path";

export async function backupCommand(ctx: Context) {
  if (!(await isOwner(ctx))) {
    return ctx.reply("🚫 This command is only available to the bot owner.");
  }

  try {
    const dbPath = path.join(process.cwd(), "lexxie.json");

    await ctx.replyWithDocument(
      new InputFile(dbPath),
      {
        caption: "💾 Lexxie MiaBot Database Backup",
      }
    );
  } catch (err) {
    console.error(err);

    await ctx.reply(
      "❌ Couldn't send the database backup."
    );
  }
}
