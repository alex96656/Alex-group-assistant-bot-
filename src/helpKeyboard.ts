import { InlineKeyboard } from "grammy";

export function helpKeyboard() {
  return new InlineKeyboard()
    .text("🛡️ Moderation", "help_moderation")
    .text("⚙️ Utilities", "help_utilities")
    .row()
    .text("🎉 Fun", "help_fun")
    .text("🤖 AI", "help_ai")
    .row()
    .text("👑 Owner", "help_owner")
    .text("ℹ️ About", "help_about")
    .row()
    .text("⬅️ Back", "main_menu");
}
