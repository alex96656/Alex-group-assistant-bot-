import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { setWarnLimit } from "../warnManager";

export async function setWarnLimitCommand(ctx: Context) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only administrators can use this command.");
  }

  const limit = Number(ctx.match?.toString());

  if (!limit || limit < 1) {
    return ctx.reply(
      "⚠️ Usage:\n/setwarnlimit <number>\n\nExample:\n/setwarnlimit 5"
    );
  }

  setWarnLimit(ctx.chat.id, limit);

  await ctx.reply(
    `✅ Warning limit updated!\n\n⚠️ Members will now be removed after ${limit} warnings.`
  );
}
