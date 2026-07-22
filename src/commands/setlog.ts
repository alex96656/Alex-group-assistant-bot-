import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { setLogChat } from "../logManager";

export async function setLogCommand(ctx: Context) {
  if (!ctx.chat) return;

  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only admins can use this command.");
  }

  setLogChat(ctx.chat.id, ctx.chat.id);

  await ctx.reply("✅ Logging has been enabled for this group.");
}
