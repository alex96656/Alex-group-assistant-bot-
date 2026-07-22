import { InlineKeyboard } from "grammy";

export function mainMenuKeyboard() {
  return new InlineKeyboard()
    .text("🤖 Bot Info", "bot_info")
    .text("📋 Help", "help")
    .row()
    .text("👑 Owner Panel", "owner_panel")
    .text("⚙️ Settings", "settings")
    .row()
    .text("🛠️ Tools", "tools")
    .text("🚀 Features", "features");
}
