import { Context } from "grammy";
import { isAdmin } from "../middleware/admin";
import { setAntiLink, isAntiLinkEnabled } from "../antiLinkManager";

export async function antiLinkCommand(ctx: Context) {
  if (!ctx.chat) return;

  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    return ctx.reply("❌ This command can only be used in groups.");
  }

  if (!(await isAdmin(ctx))) {
    return ctx.reply("🚫 Only admins can use this command.");
  }

  const args = ctx.message?.text?.split(" ").slice(1);

  if (!args?.length) {
    return ctx.reply(
      `🔗 Anti-Link is currently ${
        isAntiLinkEnabled(ctx.chat.id) ? "✅ ON" : "❌ OFF"
      }\n\nUsage:\n/antilink on\n/antilink off\n/antilink status`
    );
  }

  const option = args[0].toLowerCase();

  if (option === "on") {
    setAntiLink(ctx.chat.id, true);
    return ctx.reply("✅ Anti-Link has been enabled.");
  }

  if (option === "off") {
    setAntiLink(ctx.chat.id, false);
    return ctx.reply("❌ Anti-Link has been disabled.");
  }

  if (option === "status") {
    return ctx.reply(
      `🔗 Anti-Link is ${
        isAntiLinkEnabled(ctx.chat.id) ? "✅ ON" : "❌ OFF"
      }.`
    );
  }

  return ctx.reply("Usage:\n/antilink on\n/antilink off\n/antilink status");
}
