import { InlineKeyboard } from "grammy";

export function mainKeyboard() {
  return new InlineKeyboard()
    .url(
      "➕ Add me to your group",
      "https://t.me/Lexxie_newbot?startgroup=true"
    )
    .row()
    .text("🤖 Bot Info", "botinfo")
    .text("📋 Help", "help")
    .row()
    .text("👑 Owner Panel", "owner")
    .text("⚙️ Settings", "settings")
    .row()
    .text("🛠 Tools", "tools")
    .text("🚀 Features", "features");
}
