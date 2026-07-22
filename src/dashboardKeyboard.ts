import { InlineKeyboard } from "grammy";

export function dashboardKeyboard() {
  return new InlineKeyboard()
    .text("📊 Statistics", "dash_stats")
    .text("👥 Users", "dash_users")
    .row()
    .text("📢 Broadcast", "dash_broadcast")
    .text("⚙️ Settings", "dash_settings")
    .row()
    .text("💾 Backup", "dash_backup")
    .text("ℹ️ Bot Info", "dash_info")
    .row()
    .text("❌ Close", "dash_close");
}
