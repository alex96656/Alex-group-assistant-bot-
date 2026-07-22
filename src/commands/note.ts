import { Context } from "grammy";
import { addNote, getNote } from "../services/notes";

export async function noteCommand(ctx: Context) {
  const userId = ctx.from?.id.toString();

  if (!userId) {
    return ctx.reply("❌ Unable to identify user.");
  }

  const args = ctx.message?.text?.split(" ").slice(1);

  if (!args || args.length < 2) {
    return ctx.reply(
      "📝 Usage:\n" +
      "/note save <name> <text>\n" +
      "/note get <name>"
    );
  }

  const action = args[0].toLowerCase();

  if (action === "save") {
    if (args.length < 3) {
      return ctx.reply("❌ Usage: /note save <name> <text>");
    }

    const name = args[1];
    const content = args.slice(2).join(" ");

    addNote(userId, name, content);

    return ctx.reply(`✅ Note "${name}" saved.`);
  }

  if (action === "get") {
    const name = args[1];
    const note = getNote(userId, name);

    if (!note) {
      return ctx.reply("❌ Note not found.");
    }

    return ctx.reply(`📝 ${name}\n\n${note}`);
  }

  return ctx.reply("❌ Unknown action. Use save or get.");
}
