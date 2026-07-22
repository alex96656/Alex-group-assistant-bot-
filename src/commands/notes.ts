import { Context } from "grammy";
import { listNotes } from "../services/notes";

export async function notesCommand(ctx: Context) {
  const userId = ctx.from?.id.toString();

  if (!userId) {
    return ctx.reply("❌ Unable to identify user.");
  }

  const notes = listNotes(userId);

  if (notes.length === 0) {
    return ctx.reply("📭 You don't have any saved notes.");
  }

  await ctx.reply(
    `📚 Your Notes\n\n${notes.map(note => `• ${note}`).join("\n")}`
  );
}
