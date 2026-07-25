import { InlineKeyboard } from "grammy";

export function mainKeyboard() {
  return new InlineKeyboard()
    .text("🤖 Bot Info", "botinfo")
    .text("📋 Help", "help")
    .row()
    .text("👑 Owner Panel", "owner")
    .text("⚙️ Settings", "settings")
    .row()
    .text("🛠 Tools", "tools")
    .text("🎮 Games", "games")
    .row()
    .text("🚀 Features", "features")
    .row()
    .url(
      "➕ Add Me to Your Group",
      "https://t.me/Lexxie_newbot?startgroup=true"
    );
}
